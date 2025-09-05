import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { US_STATES } from '../data/mockData';

const StateSelector = ({ selectedState, onStateChange }) => {
  return (
    <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-h2 text-text-primary">Select Your State</h2>
      </div>
      
      <p className="text-body text-text-secondary mb-4">
        Choose your state to view specific legal information and rights guidance.
      </p>
      
      <div className="relative">
        <select
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-text-primary appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        >
          <option value="">Choose your state...</option>
          {US_STATES.map(state => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary pointer-events-none" />
      </div>
    </div>
  );
};

export default StateSelector;