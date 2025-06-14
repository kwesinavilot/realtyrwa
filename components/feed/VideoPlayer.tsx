'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  property: Property;
  isActive: boolean;
  onVideoEnd?: () => void;
}

export default function VideoPlayer({ property, isActive, onVideoEnd }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const { videoPlayer, setVideoPlaying, setVolume, toggleMute, incrementViews } = useAppStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      onVideoEnd?.();
    };

    const handleTimeUpdate = () => {
      // Increment views when video plays for 3 seconds
      if (video.currentTime > 3) {
        incrementViews(property.id);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [property.id, onVideoEnd, incrementViews]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && !isLoading) {
      video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }, [isActive, isLoading, setVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = videoPlayer.isMuted ? 0 : videoPlayer.volume;
  }, [videoPlayer.volume, videoPlayer.isMuted]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div 
      className="relative w-full h-full bg-black overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={property.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        poster={property.thumbnail}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/20"
      >
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "w-16 h-16 rounded-full bg-black/50 flex items-center justify-center text-white transition-opacity",
              videoPlayer.isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            {videoPlayer.isPlaying ? (
              <Pause className="w-8 h-8 ml-1" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </motion.div>
        </button>

        {/* Volume Control */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            {videoPlayer.isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          
          <div className="w-20 h-10 bg-black/50 rounded-full flex items-center px-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={videoPlayer.volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}