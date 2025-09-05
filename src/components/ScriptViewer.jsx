import React, { useState } from 'react';
import { MessageSquare, Copy, Check, Globe } from 'lucide-react';
import { SCRIPTS } from '../data/mockData';

const ScriptViewer = ({ state }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedScenario, setSelectedScenario] = useState('traffic_stop');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const scripts = SCRIPTS[selectedLanguage]?.[selectedScenario] || [];

  const scenarios = [
    { value: 'traffic_stop', label: 'Traffic Stop' },
    { value: 'street_encounter', label: 'Street Encounter' },
    { value: 'arrest', label: 'Arrest Situation' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' }
  ];

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-h2 text-text-primary">Scripted Responses</h2>
      </div>
      
      <p className="text-body text-text-secondary mb-6">
        Use these pre-written phrases to effectively communicate your rights during police encounters.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Scenario</label>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            {scenarios.map(scenario => (
              <option key={scenario.value} value={scenario.value}>
                {scenario.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            <Globe className="inline h-4 w-4 mr-1" />
            Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {scripts.map((script, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
            <p className="text-body text-text-primary flex-1 mr-4">{script}</p>
            <button
              onClick={() => copyToClipboard(script, index)}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              title="Copy to clipboard"
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Remember:</strong> Remain calm and polite. These scripts help you assert your rights clearly and respectfully.
        </p>
      </div>
    </div>
  );
};

export default ScriptViewer;