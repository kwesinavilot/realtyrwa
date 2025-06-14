'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { getProperties } from '@/lib/data';
import VideoPlayer from '@/components/feed/VideoPlayer';
import PropertyOverlay from '@/components/feed/PropertyOverlay';
import InvestmentPanel from '@/components/feed/InvestmentPanel';
import NavigationControls from '@/components/feed/NavigationControls';
import SocialActions from '@/components/feed/SocialActions';
import { Loader2 } from 'lucide-react';

export default function FeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { 
    properties, 
    setProperties, 
    videoPlayer, 
    setCurrentVideoIndex 
  } = useAppStore();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const propertiesData = await getProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [setProperties]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      handleNavigation(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [videoPlayer.currentIndex, properties.length]);

  const handleNavigation = (direction: 'up' | 'down') => {
    const currentIndex = videoPlayer.currentIndex;
    
    if (direction === 'down' && currentIndex < properties.length - 1) {
      setCurrentVideoIndex(currentIndex + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentVideoIndex(currentIndex - 1);
    }
  };

  const handleVideoEnd = () => {
    if (videoPlayer.currentIndex < properties.length - 1) {
      setCurrentVideoIndex(videoPlayer.currentIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-slate-300 text-lg mb-4">No properties available</p>
          <p className="text-slate-500">Check back later for new investment opportunities</p>
        </div>
      </div>
    );
  }

  const currentProperty = properties[videoPlayer.currentIndex];

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={videoPlayer.currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <VideoPlayer
            property={currentProperty}
            isActive={true}
            onVideoEnd={handleVideoEnd}
          />
          
          <PropertyOverlay property={currentProperty} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <NavigationControls
        onNavigate={handleNavigation}
        canNavigateUp={videoPlayer.currentIndex > 0}
        canNavigateDown={videoPlayer.currentIndex < properties.length - 1}
      />

      {/* Social Actions */}
      <SocialActions property={currentProperty} />

      {/* Investment Panel */}
      <InvestmentPanel />

      {/* Video Index Indicator */}
      <div className="fixed top-24 right-4 z-30">
        <div className="bg-black/50 rounded-full px-3 py-1 text-sm text-white">
          {videoPlayer.currentIndex + 1} / {properties.length}
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="fixed bottom-4 left-4 z-30">
        <div className="bg-black/50 rounded-lg p-3 text-xs text-white/70">
          <div>↑↓ Navigate • Space Play/Pause</div>
        </div>
      </div>
    </div>
  );
}