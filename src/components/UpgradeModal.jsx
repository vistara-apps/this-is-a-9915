import React from 'react';
import { X, Crown, Check, Sparkles, Shield, Globe, Zap } from 'lucide-react';
import { useUIStore } from '../store/useStore';

const UpgradeModal = () => {
  const { modalOpen, setModalOpen } = useUIStore();
  
  const isOpen = modalOpen === 'upgrade';

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Unlimited AI Cards',
      description: 'Generate unlimited personalized rights cards with AI'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Multilingual Scripts',
      description: 'Access scripts in multiple languages including Spanish'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Enhanced Reports',
      description: 'AI-powered incident report enhancement and suggestions'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Offline Access',
      description: 'Download content for offline access when you need it most'
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: 'Priority Support',
      description: '24/7 priority customer support and legal updates'
    }
  ];

  const handleUpgrade = () => {
    // In a real app, this would integrate with Stripe
    alert('Stripe integration would be implemented here');
    setModalOpen(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-h2 text-text-primary">Upgrade to Premium</h2>
          </div>
          <button
            onClick={() => setModalOpen(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="h-8 w-8" />
                <span className="text-2xl font-bold">Premium</span>
              </div>
              <div className="text-4xl font-bold mb-2">$4.99</div>
              <div className="text-lg opacity-90">per month</div>
              <div className="text-sm opacity-75 mt-2">Cancel anytime</div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Get unlimited access to all premium features and support the development of Rights Companion.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Premium Features</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{feature.title}</h4>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Free vs Premium</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Free Plan</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>3 AI cards per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>5 custom scripts per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Basic incident reporting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>English language only</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-3">Premium Plan</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Unlimited AI cards</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Unlimited custom scripts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Enhanced AI reporting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Multiple languages</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Offline access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg mb-4"
            >
              Upgrade to Premium
            </button>
            <p className="text-xs text-text-secondary">
              Secure payment processed by Stripe. Cancel anytime from your account settings.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
