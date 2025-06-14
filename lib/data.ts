import { Property } from './types';
import propertiesData from '../data/properties.json';

export const getProperties = async (): Promise<Property[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return propertiesData as Property[];
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const property = propertiesData.find(p => p.id === id);
  return property as Property || null;
};

export const uploadProperty = async (propertyData: Omit<Property, 'id' | 'likes' | 'views' | 'comments' | 'aiScore' | 'createdAt'>): Promise<Property> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newProperty: Property = {
    ...propertyData,
    id: Date.now().toString(),
    likes: 0,
    views: 0,
    comments: 0,
    aiScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  return newProperty;
};