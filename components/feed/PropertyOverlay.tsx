'use client';

import { motion } from 'framer-motion';
import { MapPin, User, TrendingUp } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '../shared/AIScoreBadge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Loader2, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import RenderMarkdown from '../shared/RenderMarkdown';

interface PropertyOverlayProps {
  property: Property;
}

const AIAnalysisButton = ({ property }: { property: Property }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { analyzeProperty } = useAppStore();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeProperty(property);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        variant="outline"
        size="sm"
        className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 hover:text-white"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Brain className="w-4 h-4 mr-2" />
            AI Analysis
          </>
        )}
      </Button>

      {analysis && (
        <div
          className="fixed z-50 bg-slate-900/95 backdrop-blur-sm overflow-y-auto p-4 rounded-lg top-20 bottom-0 left-6 right-0 lg:top-[30.5%] lg:left-6 lg:right-[70%] max-w-md shadow-lg"
          style={{ height: '100vh' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-indigo-400">AI Investment Analysis</div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAnalysis(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-h-full">
            <RenderMarkdown
              text={analysis}
              className="text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

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
          <div className="text-left">
            <div className="text-white font-semibold">{formatCurrency(property.sharePrice)}</div>
            <div className="text-xs text-slate-400">Per Share</div>
          </div>
          <div className="text-left">
            <div className="text-white font-semibold">{property.roi}</div>
            <div className="text-xs text-slate-400">Expected ROI</div>
          </div>
          <div className="text-left">
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
        <AIAnalysisButton property={property} />
      </div>
    </motion.div>
  );
}