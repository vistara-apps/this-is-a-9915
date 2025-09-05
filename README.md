# Rights Companion

A mobile-first web application that provides users with concise, state-specific information about their rights during police encounters, along with actionable scripts and documentation tools.

## Features

### Core Features
- **On-Demand Rights Summary**: Mobile-optimized guide detailing user rights during police encounters, tailored to their current location or selected state
- **State-Specific Law Navigation**: Select your state to view specific legal nuances and regulations pertaining to police interactions
- **Scripted Response Guidance**: Pre-written, easy-to-use scripts in English and Spanish for effective communication during encounters
- **Incident Documentation Tools**: Quick recording of incident details with time, location, and officer information
- **Shareable Card Generation**: AI-powered generation of shareable digital 'cards' summarizing key rights and contact information

### Premium Features
- **Unlimited AI-Generated Content**: Generate unlimited personalized rights cards and custom scripts
- **Multilingual Support**: Access content in multiple languages including Spanish
- **Enhanced Incident Reporting**: AI-powered suggestions for improving incident reports
- **Offline Access**: Download content for offline access when you need it most
- **Priority Support**: 24/7 priority customer support and legal updates

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **AI Integration**: OpenAI GPT-3.5-turbo
- **State Management**: Zustand
- **UI Components**: Lucide React icons
- **Deployment**: Docker-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-9915.git
   cd this-is-a-9915
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenAI Configuration (optional)
   VITE_OPENAI_API_KEY=your_openai_api_key

   # App Configuration
   VITE_APP_ENV=development
   VITE_APP_NAME=Rights Companion
   VITE_APP_VERSION=1.0.0
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase SQL editor:
   ```bash
   # Copy the contents of supabase/schema.sql and run in Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## Database Schema

The application uses the following main tables:

- **users**: User profiles and subscription status
- **legal_guides**: State-specific legal information
- **scripts**: Pre-written scripts for different situations
- **saved_cards**: User-generated shareable cards
- **incident_reports**: User incident documentation
- **subscriptions**: Premium subscription management

## API Integration

### Supabase
- **Authentication**: User registration, login, and session management
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Live updates for user data

### OpenAI (Optional)
- **Content Generation**: AI-powered rights cards and custom scripts
- **Report Enhancement**: Suggestions for improving incident reports
- **Translation**: Multi-language content support

## Deployment

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t rights-companion .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 rights-companion
   ```

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## Configuration

### Design System

The app uses a comprehensive design system with:
- **Colors**: Primary, accent, surface, and text colors
- **Typography**: Responsive text scales
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI components

### Subscription Management

The app supports a freemium model:
- **Free Tier**: Limited AI generations, basic features
- **Premium Tier**: Unlimited access, advanced features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal Disclaimer

This application provides general information about constitutional rights and should not replace professional legal advice. Users should consult with qualified legal professionals for specific legal situations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@rightscompanion.app or create an issue in this repository.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Additional languages support
- [ ] Integration with legal aid organizations
- [ ] Advanced AI features
- [ ] Offline-first architecture
- [ ] Push notifications for legal updates
