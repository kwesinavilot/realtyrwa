'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface NavigationControlsProps {
  onNavigate: (direction: 'up' | 'down') => void;
  canNavigateUp: boolean;
  canNavigateDown: boolean;
}

export default function NavigationControls({
  onNavigate,
  canNavigateUp,
  canNavigateDown
}: NavigationControlsProps) {
  const { videoPlayer } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (canNavigateUp) onNavigate('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (canNavigateDown) onNavigate('down');
          break;
        case ' ':
          e.preventDefault();
          // Handle play/pause through video player
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, canNavigateUp, canNavigateDown]);

  return (
    <div className="fixed right-5 top-72 top-[275px] md:top-[355px] transform -translate-y-1/2 z-30">
      <div className="flex flex-col space-y-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('up')}
            disabled={!canNavigateUp}
            className="w-12 h-12 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 disabled:opacity-30"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('down')}
            disabled={!canNavigateDown}
            className="w-12 h-12 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 disabled:opacity-30"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}