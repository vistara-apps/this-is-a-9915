import React from 'react';
import { Shield, AlertTriangle, BookOpen } from 'lucide-react';
import { LEGAL_GUIDES } from '../data/mockData';

const RightsSummary = ({ state }) => {
  const guide = LEGAL_GUIDES[state];
  
  if (!guide) {
    return (
      <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-text-secondary mx-auto mb-4" />
          <p className="text-body text-text-secondary">Select a state to view your rights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="h-6 w-6 text-accent" />
        <h2 className="text-h2 text-text-primary">{guide.title}</h2>
      </div>
      
      <p className="text-body text-text-secondary mb-6">
        {guide.content.summary}
      </p>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Your Fundamental Rights</h3>
        <div className="space-y-3">
          {guide.content.rights.map((right, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-body text-text-primary">{right}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <h4 className="font-semibold text-yellow-800">State-Specific Considerations</h4>
        </div>
        <div className="space-y-2">
          {guide.content.specifics.map((specific, index) => (
            <p key={index} className="text-sm text-yellow-700">{specific}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightsSummary;