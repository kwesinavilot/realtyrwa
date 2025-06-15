'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { getScoreBadge } from '@/lib/ai';
import { cn } from '@/lib/utils';

interface AIScoreBadgeProps {
  score: number;
  className?: string;
  showLabel?: boolean;
}

export default function AIScoreBadge({ 
  score, 
  className, 
  showLabel = true 
}: AIScoreBadgeProps) {
  const { emoji, label, color } = getScoreBadge(score);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn("inline-flex items-center", className)}
    >
      <Badge 
        className={cn(
          "flex items-center space-x-1 text-left px-0 text-white font-semibold",
          color
        )}
      >
        <span className="text-sm">{emoji}</span>
        <span>{score}</span>
        {showLabel && <span className="text-xs">({label})</span>}
      </Badge>
    </motion.div>
  );
}