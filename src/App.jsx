import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StateSelector from './components/StateSelector';
import RightsSummary from './components/RightsSummary';
import ScriptViewer from './components/ScriptViewer';
import IncidentRecorder from './components/IncidentRecorder';
import ShareableCard from './components/ShareableCard';
import SubscriptionBanner from './components/SubscriptionBanner';

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [activeTab, setActiveTab] = useState('rights');

  // Try to get user's location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use a reverse geocoding API
          // For demo purposes, we'll just set a default state
          console.log('Location obtained:', position.coords);
        },
        (error) => {
          console.log('Location access denied or failed:', error);
        }
      );
    }
  }, []);

  const tabs = [
    { id: 'rights', label: 'Your Rights', icon: '🛡️' },
    { id: 'scripts', label: 'Scripts', icon: '💬' },
    { id: 'document', label: 'Document', icon: '📝' },
    { id: 'share', label: 'Share Card', icon: '🔗' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      
      <main className="max-w-screen-lg mx-auto px-4 md:px-6 py-6">
        <SubscriptionBanner />
        
        <StateSelector 
          selectedState={selectedState} 
          onStateChange={setSelectedState} 
        />
        
        {/* Mobile-first tab navigation */}
        <div className="mb-6">
          <div className="flex overflow-x-auto pb-2 space-x-2 sm:space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        <div className="space-y-6">
          {activeTab === 'rights' && (
            <RightsSummary state={selectedState} />
          )}
          
          {activeTab === 'scripts' && (
            <ScriptViewer state={selectedState} />
          )}
          
          {activeTab === 'document' && (
            <IncidentRecorder />
          )}
          
          {activeTab === 'share' && (
            <ShareableCard state={selectedState} />
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-caption text-text-secondary mb-2">
              Rights Companion - Know your rights. Get instant guidance.
            </p>
            <p className="text-xs text-text-secondary">
              This app provides general information and should not replace professional legal advice.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;