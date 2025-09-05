import React, { useState } from 'react';
import { Shield, Menu, User, LogOut, Crown, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useUIStore } from '../store/useStore';
import { useSubscriptionStore } from '../store/useStore';

const Header = ({ onMenuClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, signOut } = useStore();
  const { setModalOpen } = useUIStore();
  const { subscriptionStatus } = useSubscriptionStore();

  const handleSignIn = () => {
    setModalOpen('auth');
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleUpgrade = () => {
    setModalOpen('upgrade');
    setShowUserMenu(false);
  };

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
            <button 
              onClick={onMenuClick}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5 text-text-secondary" />
            </button>
            
            {!isAuthenticated ? (
              <button 
                onClick={handleSignIn}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-text-primary">
                      {user?.user_metadata?.firstName || user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className="flex items-center space-x-1">
                      {subscriptionStatus === 'premium' ? (
                        <>
                          <Crown className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600">Premium</span>
                        </>
                      ) : (
                        <span className="text-xs text-text-secondary">Free</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="text-sm font-medium text-text-primary">
                        {user?.email}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {subscriptionStatus === 'premium' ? 'Premium Member' : 'Free Account'}
                      </div>
                    </div>
                    
                    {subscriptionStatus !== 'premium' && (
                      <button
                        onClick={handleUpgrade}
                        className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span>Upgrade to Premium</span>
                      </button>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
