'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Property } from '@/lib/types';
import { formatNumber } from '@/lib/web3';
import { cn } from '@/lib/utils';
import { toast } from "sonner"

interface SocialActionsProps {
  property: Property;
}

export default function SocialActions({ property }: SocialActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { likeProperty, openInvestmentPanel } = useAppStore();

  const handleLike = () => {
    if (!isLiked) {
      likeProperty(property.id);
      setIsLiked(true);
    }
  };

  const handleInvest = () => {
    openInvestmentPanel(property);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast('Link copied to clipboard!');
    }
  };

  const handleComment = () => {
    // TODO: Implement comments
  };

  const actionItems = [
    {
      icon: Heart,
      label: formatNumber(property.likes),
      onClick: handleLike,
      isActive: isLiked,
      activeColor: 'text-red-500',
    },
    {
      icon: MessageCircle,
      label: formatNumber(property.comments),
      onClick: handleComment,
      isActive: false,
      activeColor: 'text-blue-500',
    },
    {
      icon: Share,
      label: 'Share',
      onClick: handleShare,
      isActive: false,
      activeColor: 'text-green-500',
    },
  ];

  return (
    <div className="fixed right-4 bottom-60 md:bottom-24 z-30">
      <div className="flex flex-col space-y-4">
        {/* Social Actions */}
        {actionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={item.onClick}
                className={cn(
                  "w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
                  item.isActive && item.activeColor
                )}
              >
                <Icon className="w-6 h-6" />
              </Button>
              <span className="text-xs text-white mt-1 font-medium">
                {item.label}
              </span>
            </motion.div>
          );
        })}

        {/* Invest Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center mt-6"
        >
          <Button
            onClick={handleInvest}
            size="sm"
            className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg"
          >
            <TrendingUp className="w-7 h-7" />
          </Button>
          <span className="text-xs text-white mt-1 font-medium">
            Invest
          </span>
        </motion.div>
      </div>
    </div>
  );
}