export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  owner: string;
  totalValue: number;
  sharePrice: number;
  totalShares: number;
  availableShares: number;
  videoUrl: string;
  thumbnail: string;
  likes: number;
  views: number;
  comments: number;
  aiScore: number;
  roi: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  createdAt: string;
  isPublic: boolean;
}

export interface Investment {
  propertyId: string;
  shares: number;
  investedAmount: number;
  currentValue: number;
  investedAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  balance: number;
  totalInvested: number;
  portfolioValue: number;
  investments: Investment[];
  createdAt: string;
}

export interface VideoPlayerState {
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface InvestmentFormData {
  amount: number;
  shares: number;
}