-- Rights Companion Database Schema
-- This file contains the complete database schema for the Rights Companion application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'cancelled')),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal guides table
CREATE TABLE public.legal_guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    guide_id TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scripts table
CREATE TABLE public.scripts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    script_id TEXT NOT NULL UNIQUE,
    state TEXT,
    language TEXT NOT NULL DEFAULT 'en',
    type TEXT NOT NULL CHECK (type IN ('traffic_stop', 'street_encounter', 'arrest', 'general')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved cards table
CREATE TABLE public.saved_cards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    card_id TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    generated_content JSONB NOT NULL,
    state TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident reports table
CREATE TABLE public.incident_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    report_id TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    officer_info TEXT,
    details TEXT NOT NULL,
    witnesses TEXT,
    media_attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_user_id ON public.users(user_id);
CREATE INDEX idx_users_subscription_status ON public.users(subscription_status);
CREATE INDEX idx_legal_guides_state ON public.legal_guides(state);
CREATE INDEX idx_scripts_state_language ON public.scripts(state, language);
CREATE INDEX idx_scripts_type ON public.scripts(type);
CREATE INDEX idx_saved_cards_user_id ON public.saved_cards(user_id);
CREATE INDEX idx_saved_cards_timestamp ON public.saved_cards(timestamp);
CREATE INDEX idx_incident_reports_user_id ON public.incident_reports(user_id);
CREATE INDEX idx_incident_reports_timestamp ON public.incident_reports(timestamp);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Legal guides policies (public read access)
CREATE POLICY "Anyone can view legal guides" ON public.legal_guides
    FOR SELECT USING (true);

-- Scripts policies (public read access)
CREATE POLICY "Anyone can view scripts" ON public.scripts
    FOR SELECT USING (true);

-- Saved cards policies
CREATE POLICY "Users can view own saved cards" ON public.saved_cards
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own saved cards" ON public.saved_cards
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved cards" ON public.saved_cards
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved cards" ON public.saved_cards
    FOR DELETE USING (auth.uid() = user_id);

-- Incident reports policies
CREATE POLICY "Users can view own incident reports" ON public.incident_reports
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own incident reports" ON public.incident_reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own incident reports" ON public.incident_reports
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own incident reports" ON public.incident_reports
    FOR DELETE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_legal_guides_updated_at
    BEFORE UPDATE ON public.legal_guides
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_scripts_updated_at
    BEFORE UPDATE ON public.scripts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_incident_reports_updated_at
    BEFORE UPDATE ON public.incident_reports
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, user_id, email)
    VALUES (NEW.id, NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial legal guides data
INSERT INTO public.legal_guides (guide_id, state, title, content) VALUES
('ca-guide', 'CA', 'California Rights During Police Encounters', '{
    "summary": "In California, you have specific rights during police encounters that are protected by both federal and state law.",
    "rights": [
        "You have the right to remain silent beyond providing your name if lawfully detained",
        "You have the right to refuse searches of your person, vehicle, or home without a warrant",
        "You have the right to ask if you are free to leave",
        "You have the right to record police interactions in public spaces",
        "You have the right to an attorney if arrested"
    ],
    "specifics": [
        "California Penal Code 148(g) protects your right to record police",
        "Stop and identify laws require only name disclosure when lawfully detained",
        "Vehicle searches require consent, warrant, or probable cause",
        "You can refuse field sobriety tests (with license consequences)"
    ]
}'),
('ny-guide', 'NY', 'New York Rights During Police Encounters', '{
    "summary": "New York law provides specific protections during police encounters, with some unique provisions.",
    "rights": [
        "You have the right to remain silent",
        "You have the right to refuse searches without a warrant",
        "You have the right to ask if you are free to leave",
        "You have the right to record police interactions",
        "You have the right to an attorney if arrested"
    ],
    "specifics": [
        "NY Civil Rights Law §79-p protects recording rights",
        "Stop and frisk requires reasonable suspicion",
        "Vehicle searches follow federal Fourth Amendment standards",
        "Immigration status cannot be the sole basis for detention"
    ]
}'),
('tx-guide', 'TX', 'Texas Rights During Police Encounters', '{
    "summary": "Texas law provides constitutional protections with specific state provisions.",
    "rights": [
        "You have the right to remain silent",
        "You have the right to refuse searches without probable cause",
        "You have the right to ask if you are free to leave",
        "You have the right to record police interactions",
        "You have the right to an attorney if arrested"
    ],
    "specifics": [
        "Texas Penal Code 38.02 requires identification only upon lawful arrest",
        "Open carry laws allow recording in public spaces",
        "Vehicle searches require consent, warrant, or exigent circumstances",
        "You can refuse field sobriety tests"
    ]
}');

-- Insert initial scripts data
INSERT INTO public.scripts (script_id, state, language, type, content) VALUES
('en-traffic-stop', NULL, 'en', 'traffic_stop', '{
    "scripts": [
        "I am exercising my right to remain silent.",
        "I do not consent to any searches.",
        "Am I free to leave?",
        "I would like to speak with an attorney.",
        "I am not resisting, but I do not consent."
    ]
}'),
('en-street-encounter', NULL, 'en', 'street_encounter', '{
    "scripts": [
        "Am I being detained or am I free to go?",
        "I am exercising my right to remain silent.",
        "I do not consent to any searches.",
        "I would like to contact my attorney.",
        "I am not answering any questions without my lawyer present."
    ]
}'),
('en-arrest', NULL, 'en', 'arrest', '{
    "scripts": [
        "I am exercising my right to remain silent.",
        "I want to speak with an attorney immediately.",
        "I do not consent to any searches.",
        "I am not resisting arrest.",
        "Please document any injuries I may have sustained."
    ]
}'),
('es-traffic-stop', NULL, 'es', 'traffic_stop', '{
    "scripts": [
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "No consiento a ninguna búsqueda.",
        "¿Soy libre de irme?",
        "Me gustaría hablar con un abogado.",
        "No me estoy resistiendo, pero no consiento."
    ]
}'),
('es-street-encounter', NULL, 'es', 'street_encounter', '{
    "scripts": [
        "¿Estoy siendo detenido o soy libre de irme?",
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "No consiento a ninguna búsqueda.",
        "Me gustaría contactar a mi abogado.",
        "No voy a responder ninguna pregunta sin mi abogado presente."
    ]
}'),
('es-arrest', NULL, 'es', 'arrest', '{
    "scripts": [
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "Quiero hablar con un abogado inmediatamente.",
        "No consiento a ninguna búsqueda.",
        "No me estoy resistiendo al arresto.",
        "Por favor documenten cualquier lesión que pueda haber sufrido."
    ]
}');
