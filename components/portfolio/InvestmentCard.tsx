'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MapPin, DollarSign } from 'lucide-react';
import { Property, Investment } from '@/lib/types';
import { formatCurrency } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '../shared/AIScoreBadge';

interface InvestmentCardProps {
  property: Property;
  investment: Investment;
  index: number;
}

export default function InvestmentCard({ property, investment, index }: InvestmentCardProps) {
  const gainLoss = investment.currentValue - investment.investedAmount;
  const gainLossPercentage = (gainLoss / investment.investedAmount) * 100;
  const isPositive = gainLoss >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/property/${property.id}`}>
        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer overflow-hidden">
          <div className="relative">
            <img
              src={property.thumbnail}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3">
              <AIScoreBadge score={property.aiScore} showLabel={false} />
            </div>
            <div className="absolute top-3 right-3">
              <Badge className={`${getRiskColor(property.riskLevel)} bg-black/50`}>
                {property.riskLevel}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {property.title}
              </h3>
              <div className="flex items-center text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-slate-400 text-xs mb-1">Invested</div>
                <div className="text-white font-semibold">
                  {formatCurrency(investment.investedAmount)}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Current Value</div>
                <div className="text-white font-semibold">
                  {formatCurrency(investment.currentValue)}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Shares Owned</div>
                <div className="text-white font-semibold">
                  {investment.shares}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Expected ROI</div>
                <div className="text-white font-semibold">
                  {property.roi}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">P&L</span>
              </div>
              <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {formatCurrency(Math.abs(gainLoss))}
                </span>
                <span className="text-sm">
                  ({isPositive ? '+' : '-'}{Math.abs(gainLossPercentage).toFixed(1)}%)
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Invested on {new Date(investment.investedAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}