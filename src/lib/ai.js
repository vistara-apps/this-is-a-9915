import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

// AI service for generating content
export const aiService = {
  // Generate a shareable rights card
  generateRightsCard: async (state, userPreferences = {}) => {
    try {
      const prompt = `Generate a concise, shareable rights card for ${state} state. 
      Include:
      1. Top 5 most important rights during police encounters
      2. State-specific legal considerations
      3. Emergency contact information format
      4. Key phrases to remember
      
      Format as JSON with sections: title, rights, stateSpecifics, emergencyInfo, keyPhrases.
      Keep it mobile-friendly and easy to share.
      
      User preferences: ${JSON.stringify(userPreferences)}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal rights assistant specializing in police encounter rights. Provide accurate, helpful information formatted for mobile sharing."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.3
      });

      const content = completion.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating rights card:', error);
      throw new Error('Failed to generate rights card');
    }
  },

  // Generate custom scripts based on situation
  generateCustomScript: async (situation, state, language = 'en') => {
    try {
      const prompt = `Generate appropriate scripts for a ${situation} situation in ${state} state.
      Language: ${language}
      
      Provide 5-7 short, clear phrases that someone can use during this type of police encounter.
      Focus on:
      1. Asserting constitutional rights
      2. De-escalation
      3. Legal protection
      4. Clear communication
      
      Return as JSON array of strings.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a legal rights assistant. Generate appropriate, legally sound scripts for police encounters. 
            If language is 'es', respond in Spanish. Otherwise, respond in English.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.2
      });

      const content = completion.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating custom script:', error);
      throw new Error('Failed to generate custom script');
    }
  },

  // Enhance incident report with AI suggestions
  enhanceIncidentReport: async (reportData) => {
    try {
      const prompt = `Review this incident report and suggest improvements:
      
      Location: ${reportData.location}
      Time: ${reportData.timestamp}
      Description: ${reportData.description}
      Officer Info: ${reportData.officerInfo || 'Not provided'}
      
      Provide suggestions for:
      1. Additional details to include
      2. Important legal considerations
      3. Evidence to preserve
      4. Next steps to consider
      
      Return as JSON with sections: suggestions, legalConsiderations, evidenceToPreserve, nextSteps.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal documentation assistant. Help improve incident reports for potential legal use."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.3
      });

      const content = completion.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error enhancing incident report:', error);
      throw new Error('Failed to enhance incident report');
    }
  },

  // Generate state-specific legal guidance
  generateLegalGuidance: async (state, specificQuestion = null) => {
    try {
      const prompt = specificQuestion 
        ? `Answer this specific legal question for ${state} state: ${specificQuestion}
           Focus on police encounter rights and provide accurate, helpful information.`
        : `Provide comprehensive legal guidance for police encounters in ${state} state.
           Include recent legal updates, specific statutes, and practical advice.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal information assistant specializing in constitutional rights during police encounters. Provide accurate, up-to-date information with appropriate disclaimers."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.2
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating legal guidance:', error);
      throw new Error('Failed to generate legal guidance');
    }
  },

  // Translate content to different languages
  translateContent: async (content, targetLanguage) => {
    try {
      const prompt = `Translate the following legal rights content to ${targetLanguage}:
      
      ${content}
      
      Maintain legal accuracy and appropriate tone. Return only the translated content.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal translator specializing in constitutional rights. Provide accurate translations that maintain legal meaning."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.1
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error translating content:', error);
      throw new Error('Failed to translate content');
    }
  }
};

// Utility functions for AI integration
export const aiUtils = {
  // Check if AI features are available
  isAvailable: () => {
    return !!import.meta.env.VITE_OPENAI_API_KEY;
  },

  // Get AI usage limits based on subscription
  getUsageLimits: (subscriptionStatus) => {
    const limits = {
      free: {
        cardsPerMonth: 3,
        scriptsPerMonth: 5,
        reportsPerMonth: 2
      },
      premium: {
        cardsPerMonth: 50,
        scriptsPerMonth: 100,
        reportsPerMonth: 25
      }
    };
    
    return limits[subscriptionStatus] || limits.free;
  },

  // Format AI responses for display
  formatResponse: (response, type) => {
    switch (type) {
      case 'card':
        return {
          ...response,
          generatedAt: new Date().toISOString(),
          type: 'ai-generated'
        };
      case 'script':
        return Array.isArray(response) ? response : [response];
      case 'report':
        return {
          ...response,
          enhancedAt: new Date().toISOString()
        };
      default:
        return response;
    }
  }
};
