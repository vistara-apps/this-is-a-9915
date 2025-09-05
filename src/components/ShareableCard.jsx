import React, { useState } from 'react';
import { Share2, Download, Copy, Check } from 'lucide-react';
import { LEGAL_GUIDES } from '../data/mockData';

const ShareableCard = ({ state }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateCard = async () => {
    if (!state) {
      alert('Please select a state first');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI card generation
    setTimeout(() => {
      const guide = LEGAL_GUIDES[state];
      const stateName = guide?.state === 'CA' ? 'California' : 
                       guide?.state === 'NY' ? 'New York' : 'Texas';
      
      const card = {
        id: Date.now(),
        state: stateName,
        timestamp: new Date().toLocaleString(),
        content: {
          title: `Your Rights in ${stateName}`,
          summary: `Essential rights during police encounters in ${stateName}`,
          keyRights: [
            'Right to remain silent',
            'Right to refuse searches',
            'Right to ask if free to leave',
            'Right to record interactions',
            'Right to an attorney'
          ],
          emergencyContacts: {
            lawyer: '(555) 123-LAWYER',
            aclu: '(555) 123-ACLU',
            emergency: '911'
          }
        }
      };
      
      setGeneratedCard(card);
      setIsGenerating(false);
    }, 2000);
  };

  const copyCard = async () => {
    if (!generatedCard) return;
    
    const cardText = `${generatedCard.content.title}

${generatedCard.content.summary}

Key Rights:
${generatedCard.content.keyRights.map(right => `• ${right}`).join('\n')}

Emergency Contacts:
• Lawyer: ${generatedCard.content.emergencyContacts.lawyer}
• ACLU: ${generatedCard.content.emergencyContacts.aclu}
• Emergency: ${generatedCard.content.emergencyContacts.emergency}

Generated: ${generatedCard.timestamp}
Source: Rights Companion App`;

    try {
      await navigator.clipboard.writeText(cardText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy card: ', err);
    }
  };

  const shareCard = async () => {
    if (!generatedCard) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: generatedCard.content.title,
          text: generatedCard.content.summary,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      copyCard();
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Share2 className="h-6 w-6 text-primary" />
        <h2 className="text-h2 text-text-primary">Shareable Rights Card</h2>
      </div>
      
      <p className="text-body text-text-secondary mb-6">
        Generate a personalized card with your rights information that you can share or save for quick reference.
      </p>
      
      {!generatedCard ? (
        <div className="text-center py-8">
          <button
            onClick={generateCard}
            disabled={isGenerating || !state}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating Card...' : 'Generate Rights Card'}
          </button>
          
          {!state && (
            <p className="text-sm text-text-secondary mt-3">
              Please select a state first to generate your rights card
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{generatedCard.content.title}</h3>
            <p className="text-blue-100 mb-4">{generatedCard.content.summary}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Your Key Rights:</h4>
              <ul className="space-y-1 text-sm">
                {generatedCard.content.keyRights.map((right, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-blue-400 pt-4">
              <h4 className="font-semibold mb-2">Emergency Contacts:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div>Lawyer: {generatedCard.content.emergencyContacts.lawyer}</div>
                <div>ACLU: {generatedCard.content.emergencyContacts.aclu}</div>
                <div>Emergency: {generatedCard.content.emergencyContacts.emergency}</div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-blue-200">
              Generated: {generatedCard.timestamp}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={shareCard}
              className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Card</span>
            </button>
            <button
              onClick={copyCard}
              className="flex items-center justify-center space-x-2 border border-gray-300 text-text-primary px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={() => setGeneratedCard(null)}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Generate New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareableCard;