import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authHelpers, dbHelpers } from '../lib/supabase';

// Main application store
export const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      subscriptionStatus: 'free',
      
      // App state
      selectedState: '',
      activeTab: 'rights',
      isLoading: false,
      error: null,
      
      // Data state
      legalGuides: {},
      scripts: {},
      savedCards: [],
      incidentReports: [],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setSelectedState: (state) => set({ selectedState: state }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      // Auth actions
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await authHelpers.signIn(email, password);
          if (error) throw error;
          
          set({ 
            user: data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
          
          // Load user data
          await get().loadUserData();
          
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },
      
      signUp: async (email, password, metadata = {}) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await authHelpers.signUp(email, password, metadata);
          if (error) throw error;
          
          set({ 
            user: data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },
      
      signOut: async () => {
        set({ isLoading: true });
        try {
          await authHelpers.signOut();
          set({ 
            user: null, 
            isAuthenticated: false,
            subscriptionStatus: 'free',
            savedCards: [],
            incidentReports: [],
            isLoading: false 
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      
      // Data loading actions
      loadUserData: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          // Load user profile
          const { data: profile } = await dbHelpers.getUserProfile(user.id);
          if (profile) {
            set({ subscriptionStatus: profile.subscription_status });
          }
          
          // Load saved cards
          const { data: cards } = await dbHelpers.getUserSavedCards(user.id);
          if (cards) {
            set({ savedCards: cards });
          }
          
          // Load incident reports
          const { data: reports } = await dbHelpers.getUserIncidentReports(user.id);
          if (reports) {
            set({ incidentReports: reports });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      },
      
      loadLegalGuides: async (state = null) => {
        try {
          const { data, error } = await dbHelpers.getLegalGuides(state);
          if (error) throw error;
          
          const guides = {};
          data.forEach(guide => {
            guides[guide.state] = guide;
          });
          
          set({ legalGuides: { ...get().legalGuides, ...guides } });
        } catch (error) {
          console.error('Error loading legal guides:', error);
        }
      },
      
      loadScripts: async (state = null, language = 'en') => {
        try {
          const { data, error } = await dbHelpers.getScripts(state, language);
          if (error) throw error;
          
          const scripts = {};
          data.forEach(script => {
            const key = `${script.language}-${script.type}`;
            scripts[key] = script;
          });
          
          set({ scripts: { ...get().scripts, ...scripts } });
        } catch (error) {
          console.error('Error loading scripts:', error);
        }
      },
      
      // Saved cards actions
      createSavedCard: async (cardData) => {
        const { user } = get();
        if (!user) return { success: false, error: 'Not authenticated' };
        
        try {
          const { data, error } = await dbHelpers.createSavedCard(user.id, cardData);
          if (error) throw error;
          
          set({ 
            savedCards: [data, ...get().savedCards] 
          });
          
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      
      // Incident reports actions
      createIncidentReport: async (reportData) => {
        const { user } = get();
        if (!user) return { success: false, error: 'Not authenticated' };
        
        try {
          const { data, error } = await dbHelpers.createIncidentReport(user.id, reportData);
          if (error) throw error;
          
          set({ 
            incidentReports: [data, ...get().incidentReports] 
          });
          
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      
      updateIncidentReport: async (reportId, updates) => {
        try {
          const { data, error } = await dbHelpers.updateIncidentReport(reportId, updates);
          if (error) throw error;
          
          set({
            incidentReports: get().incidentReports.map(report =>
              report.id === reportId ? data : report
            )
          });
          
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      
      deleteIncidentReport: async (reportId) => {
        try {
          const { error } = await dbHelpers.deleteIncidentReport(reportId);
          if (error) throw error;
          
          set({
            incidentReports: get().incidentReports.filter(report => report.id !== reportId)
          });
          
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
      
      // Utility actions
      initializeAuth: async () => {
        try {
          const { data } = await authHelpers.getCurrentUser();
          if (data.user) {
            set({ 
              user: data.user, 
              isAuthenticated: true 
            });
            await get().loadUserData();
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
        }
      }
    }),
    {
      name: 'rights-companion-store',
      partialize: (state) => ({
        selectedState: state.selectedState,
        activeTab: state.activeTab,
        subscriptionStatus: state.subscriptionStatus
      })
    }
  )
);

// Subscription store for managing premium features
export const useSubscriptionStore = create((set, get) => ({
  isSubscribed: false,
  subscriptionStatus: 'free',
  usageStats: {
    cardsGenerated: 0,
    scriptsGenerated: 0,
    reportsEnhanced: 0
  },
  
  setSubscriptionStatus: (status) => set({ 
    subscriptionStatus: status,
    isSubscribed: status === 'premium'
  }),
  
  updateUsageStats: (type) => set((state) => ({
    usageStats: {
      ...state.usageStats,
      [type]: state.usageStats[type] + 1
    }
  })),
  
  canUseFeature: (feature) => {
    const { subscriptionStatus, usageStats } = get();
    
    if (subscriptionStatus === 'premium') return true;
    
    const limits = {
      cardsGenerated: 3,
      scriptsGenerated: 5,
      reportsEnhanced: 2
    };
    
    return usageStats[feature] < limits[feature];
  },
  
  resetUsageStats: () => set({
    usageStats: {
      cardsGenerated: 0,
      scriptsGenerated: 0,
      reportsEnhanced: 0
    }
  })
}));

// UI store for managing UI state
export const useUIStore = create((set) => ({
  sidebarOpen: false,
  modalOpen: null,
  notifications: [],
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setModalOpen: (modal) => set({ modalOpen: modal }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      id: Date.now(),
      ...notification
    }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] })
}));
