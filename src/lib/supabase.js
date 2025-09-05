import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database table names
export const TABLES = {
  USERS: 'users',
  LEGAL_GUIDES: 'legal_guides',
  SCRIPTS: 'scripts',
  SAVED_CARDS: 'saved_cards',
  INCIDENT_REPORTS: 'incident_reports',
  SUBSCRIPTIONS: 'subscriptions'
};

// Helper functions for common operations
export const authHelpers = {
  signUp: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

export const dbHelpers = {
  // User operations
  createUserProfile: async (userId, profileData) => {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert([{ user_id: userId, ...profileData }])
      .select()
      .single();
    return { data, error };
  },

  getUserProfile: async (userId) => {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  // Legal guides operations
  getLegalGuides: async (state = null) => {
    let query = supabase.from(TABLES.LEGAL_GUIDES).select('*');
    if (state) {
      query = query.eq('state', state);
    }
    const { data, error } = await query;
    return { data, error };
  },

  // Scripts operations
  getScripts: async (state = null, language = 'en') => {
    let query = supabase.from(TABLES.SCRIPTS).select('*').eq('language', language);
    if (state) {
      query = query.eq('state', state);
    }
    const { data, error } = await query;
    return { data, error };
  },

  // Saved cards operations
  createSavedCard: async (userId, cardData) => {
    const { data, error } = await supabase
      .from(TABLES.SAVED_CARDS)
      .insert([{ user_id: userId, ...cardData }])
      .select()
      .single();
    return { data, error };
  },

  getUserSavedCards: async (userId) => {
    const { data, error } = await supabase
      .from(TABLES.SAVED_CARDS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Incident reports operations
  createIncidentReport: async (userId, reportData) => {
    const { data, error } = await supabase
      .from(TABLES.INCIDENT_REPORTS)
      .insert([{ user_id: userId, ...reportData }])
      .select()
      .single();
    return { data, error };
  },

  getUserIncidentReports: async (userId) => {
    const { data, error } = await supabase
      .from(TABLES.INCIDENT_REPORTS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  updateIncidentReport: async (reportId, updates) => {
    const { data, error } = await supabase
      .from(TABLES.INCIDENT_REPORTS)
      .update(updates)
      .eq('id', reportId)
      .select()
      .single();
    return { data, error };
  },

  deleteIncidentReport: async (reportId) => {
    const { error } = await supabase
      .from(TABLES.INCIDENT_REPORTS)
      .delete()
      .eq('id', reportId);
    return { error };
  }
};
