'use client';

import { motion } from 'framer-motion';
import { MapPin, User, TrendingUp } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '../shared/AIScoreBadge';

interface PropertyOverlayProps {
  property: Property;
}

export default function PropertyOverlay({ property }: PropertyOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
    >
      <div className="max-w-md">
        {/* AI Score Badge */}
        <div className="mb-3">
          <AIScoreBadge score={property.aiScore} />
        </div>

        {/* Property Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {property.title}
        </h2>

        {/* Location */}
        <div className="flex items-center text-slate-300 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-white font-semibold">{formatCurrency(property.sharePrice)}</div>
            <div className="text-xs text-slate-400">Per Share</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">{property.roi}</div>
            <div className="text-xs text-slate-400">Expected ROI</div>
          </div>
          <div className="text-center">
            <div className={`font-semibold ${getRiskColor(property.riskLevel)}`}>
              {property.riskLevel}
            </div>
            <div className="text-xs text-slate-400">Risk Level</div>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-300">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm">{property.owner}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-slate-400">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">{formatNumber(property.views)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mt-3 line-clamp-2">
          {property.description}
        </p>
      </div>
    </motion.div>
  );
}