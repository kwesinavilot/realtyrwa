import { create } from 'zustand';
import { Property, User, VideoPlayerState, Investment, LoginCredentials, SignupData, Message } from './types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  
  // Video player state
  videoPlayer: VideoPlayerState;
  properties: Property[];
  
  // Investment state
  isInvestmentPanelOpen: boolean;
  selectedProperty: Property | null;
  
  // Auth prompt state
  showAuthPrompt: boolean;
  authPromptAction: string;
  
  // AI Chat state
  chatMessages: Message[];
  isChatOpen: boolean;
  isAnalyzing: boolean;
  currentAnalysis: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setProperties: (properties: Property[]) => void;
  setCurrentVideoIndex: (index: number) => void;
  setVideoPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  openInvestmentPanel: (property: Property) => void;
  closeInvestmentPanel: () => void;
  makeInvestment: (propertyId: string, amount: number, shares: number) => void;
  likeProperty: (propertyId: string) => void;
  incrementViews: (propertyId: string) => void;
  showAuthPromptModal: (action: string) => void;
  hideAuthPrompt: () => void;
  
  // AI Actions
  toggleChat: () => void;
  addChatMessage: (message: Message) => void;
  clearChat: () => void;
  setAnalyzing: (analyzing: boolean) => void;
  setCurrentAnalysis: (analysis: string | null) => void;
  
  // API calls
  conductMarketResearch: (location: string, options?: any) => Promise<string>;
  analyzeProperty: (property: Property) => Promise<string>;
  sendChatMessage: (message: string) => Promise<string>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  
  videoPlayer: {
    currentIndex: 0,
    isPlaying: false,
    volume: 1,
    isMuted: false,
  },
  
  properties: [],
  isInvestmentPanelOpen: false,
  selectedProperty: null,
  showAuthPrompt: false,
  authPromptAction: '',
  
  // AI Chat state
  chatMessages: [],
  isChatOpen: false,
  isAnalyzing: false,
  currentAnalysis: null,
  
  // Auth actions
  login: async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: "1",
      name: "Alex Thompson",
      username: "alexthompson",
      email: credentials.email,
      balance: 5000,
      totalInvested: 2500,
      portfolioValue: 2750,
      investments: [
        {
          propertyId: "1",
          shares: 10,
          investedAmount: 2500,
          currentValue: 2750,
          investedAt: "2024-01-16"
        }
      ],
      createdAt: "2024-01-15T10:30:00Z"
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  
  signup: async (userData: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      balance: 1000, // Welcome bonus
      totalInvested: 0,
      portfolioValue: 0,
      investments: [],
      createdAt: new Date().toISOString()
    };
    
    set({ user: newUser, isAuthenticated: true });
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      isInvestmentPanelOpen: false,
      selectedProperty: null 
    });
  },
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  
  setProperties: (properties) => set({ properties }),
  
  setCurrentVideoIndex: (index) => 
    set((state) => ({
      videoPlayer: { ...state.videoPlayer, currentIndex: index }
    })),
  
  setVideoPlaying: (isPlaying) =>
    set((state) => ({
      videoPlayer: { ...state.videoPlayer, isPlaying }
    })),
  
  setVolume: (volume) =>
    set((state) => ({
      videoPlayer: { ...state.videoPlayer, volume }
    })),
  
  toggleMute: () =>
    set((state) => ({
      videoPlayer: { ...state.videoPlayer, isMuted: !state.videoPlayer.isMuted }
    })),
  
  openInvestmentPanel: (property) => {
    const state = get();
    if (!state.isAuthenticated) {
      set({ showAuthPrompt: true, authPromptAction: 'invest' });
      return;
    }
    set({ isInvestmentPanelOpen: true, selectedProperty: property });
  },
  
  closeInvestmentPanel: () => 
    set({ isInvestmentPanelOpen: false, selectedProperty: null }),
  
  makeInvestment: (propertyId, amount, shares) => {
    const state = get();
    if (!state.user || !state.isAuthenticated) return;
    
    const newInvestment: Investment = {
      propertyId,
      shares,
      investedAmount: amount,
      currentValue: amount,
      investedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedUser = {
      ...state.user,
      balance: state.user.balance - amount,
      totalInvested: state.user.totalInvested + amount,
      portfolioValue: state.user.portfolioValue + amount,
      investments: [...state.user.investments, newInvestment]
    };
    
    const updatedProperties = state.properties.map(prop => 
      prop.id === propertyId 
        ? { ...prop, availableShares: prop.availableShares - shares }
        : prop
    );
    
    set({ 
      user: updatedUser, 
      properties: updatedProperties,
      // isInvestmentPanelOpen: false,
      // selectedProperty: null
    });
  },
  
  likeProperty: (propertyId) => {
    const state = get();
    if (!state.isAuthenticated) {
      set({ showAuthPrompt: true, authPromptAction: 'like' });
      return;
    }
    
    set((state) => ({
      properties: state.properties.map(prop =>
        prop.id === propertyId
          ? { ...prop, likes: prop.likes + 1 }
          : prop
      )
    }));
  },
  
  incrementViews: (propertyId) => {
    set((state) => ({
      properties: state.properties.map(prop =>
        prop.id === propertyId
          ? { ...prop, views: prop.views + 1 }
          : prop
      )
    }));
  },
  
  showAuthPromptModal: (action: string) => {
    set({ showAuthPrompt: true, authPromptAction: action });
  },
  
  hideAuthPrompt: () => {
    set({ showAuthPrompt: false, authPromptAction: '' });
  },
  
  // AI Actions
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  addChatMessage: (message) => 
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  
  clearChat: () => set({ chatMessages: [] }),
  
  setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  
  // API calls
  conductMarketResearch: async (location, options) => {
    set({ isAnalyzing: true });
    try {
      const response = await fetch('/api/market-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, options })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      set({ currentAnalysis: data.analysis });
      return data.analysis;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isAnalyzing: false });
    }
  },
  
  analyzeProperty: async (property) => {
    set({ isAnalyzing: true });
    try {
      const propertyData = {
        propertyId: property.id,
        location: property.location,
        propertyType: 'residential', // You can make this dynamic
        price: property.totalValue,
        features: [property.description]
      };
      
      const response = await fetch('/api/property-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      return data.analysis;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isAnalyzing: false });
    }
  },
  
  sendChatMessage: async (message) => {
    const state = get();
    const userMessage: Message = { role: 'user', content: message };
    
    // Add user message immediately
    set({ chatMessages: [...state.chatMessages, userMessage] });
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          history: state.chatMessages.slice(-10) // Last 10 messages for context
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      const aiMessage: Message = { role: 'assistant', content: data.response };
      set((state) => ({ chatMessages: [...state.chatMessages, aiMessage] }));
      
      return data.response;
    } catch (error: any) {
      // Add error message to chat
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${error.message}` 
      };
      set((state) => ({ chatMessages: [...state.chatMessages, errorMessage] }));
      throw error;
    }
  }
}));