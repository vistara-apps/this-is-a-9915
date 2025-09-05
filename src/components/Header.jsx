import React from 'react';
import { Shield, Menu, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-surface shadow-card border-b border-gray-200">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-h2 text-text-primary">Rights Companion</h1>
              <p className="text-caption text-text-secondary hidden sm:block">Know your rights. Get instant guidance.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="h-5 w-5 text-text-secondary" />
            </button>
            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;