import React, { useState } from 'react';
import { Crown, X, Check } from 'lucide-react';

const SubscriptionBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!showBanner) return null;

  const premiumFeatures = [
    'Multilingual scripts in 10+ languages',
    'Offline access to all content',
    'Advanced incident recording with media',
    'Legal contact directory',
    'Priority customer support',
    'Regular content updates'
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 mb-6 rounded-lg shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Upgrade to Premium</h3>
              <p className="text-sm opacity-90">Unlock advanced features for $4.99/month</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors text-sm"
            >
              Learn More
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-h2 text-text-primary">Premium Features</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-body text-text-primary">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Start Free Trial (7 days)
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full border border-gray-300 text-text-primary py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue with Free Version
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionBanner;