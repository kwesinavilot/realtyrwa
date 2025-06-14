import { Property } from './types';

export const calculateAIScore = (property: Property): number => {
  const viewWeight = 0.3;
  const likeWeight = 0.4;
  const commentWeight = 0.3;
  
  // Normalize the values (assuming max values for scaling)
  const maxViews = 20000;
  const maxLikes = 3000;
  const maxComments = 200;
  
  const normalizedViews = Math.min(property.views / maxViews, 1);
  const normalizedLikes = Math.min(property.likes / maxLikes, 1);
  const normalizedComments = Math.min(property.comments / maxComments, 1);
  
  const score = (
    normalizedViews * viewWeight +
    normalizedLikes * likeWeight +
    normalizedComments * commentWeight
  ) * 100;
  
  return Math.round(score);
};

export const getScoreBadge = (score: number) => {
  if (score >= 90) return { emoji: '🔥', label: 'Hot', color: 'bg-red-500' };
  if (score >= 70) return { emoji: '⚡', label: 'Rising', color: 'bg-yellow-500' };
  if (score >= 50) return { emoji: '📈', label: 'Growing', color: 'bg-blue-500' };
  return { emoji: '📊', label: 'Stable', color: 'bg-gray-500' };
};

export const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'text-green-500';
    case 'Medium': return 'text-yellow-500';
    case 'High': return 'text-red-500';
    default: return 'text-gray-500';
  }
};