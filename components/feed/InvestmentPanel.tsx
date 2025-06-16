'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, DollarSign, TrendingUp, Loader2, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatCurrency, formatNumber } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '../shared/AIScoreBadge';

export default function InvestmentPanel() {
  const [investmentAmount, setInvestmentAmount] = useState(250);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentComplete, setInvestmentComplete] = useState(false);

  const {
    isInvestmentPanelOpen,
    selectedProperty,
    user,
    closeInvestmentPanel,
    makeInvestment
  } = useAppStore();

  if (!selectedProperty) return null;

  const shares = Math.floor(investmentAmount / selectedProperty.sharePrice);
  const totalCost = shares * selectedProperty.sharePrice;
  const progressPercentage = ((selectedProperty.totalShares - selectedProperty.availableShares) / selectedProperty.totalShares) * 100;

  const quickAmounts = [25, 50, 100, 250, 500];

  const handleInvest = async () => {
    if (!user || totalCost > user.balance) return;

    setIsInvesting(true);

    // Simulate investment process
    await new Promise(resolve => setTimeout(resolve, 2000));

    makeInvestment(selectedProperty.id, totalCost, shares);
    setIsInvesting(false);
    setInvestmentComplete(true);

    // Auto-close after success
    setTimeout(() => {
      setInvestmentComplete(false);
      closeInvestmentPanel();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isInvestmentPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeInvestmentPanel}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Invest in Property</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeInvestmentPanel}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {!investmentComplete ? (
                <>
                  {/* Property Summary */}
                  <Card className="bg-slate-800 border-slate-700 mb-6">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">
                          {selectedProperty.title}
                        </CardTitle>
                        <AIScoreBadge score={selectedProperty.aiScore} showLabel={false} />
                      </div>
                      <p className="text-slate-400 text-sm">{selectedProperty.location}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Funded</span>
                          <span className="text-white">{progressPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>{formatNumber(selectedProperty.totalShares - selectedProperty.availableShares)} shares sold</span>
                          <span>{formatNumber(selectedProperty.availableShares)} available</span>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-white font-semibold">{formatCurrency(selectedProperty.sharePrice)}</div>
                          <div className="text-xs text-slate-400">Per Share</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{selectedProperty.roi}</div>
                          <div className="text-xs text-slate-400">Expected ROI</div>
                        </div>
                        <div>
                          <div className={`font-semibold ${getRiskColor(selectedProperty.riskLevel)}`}>
                            {selectedProperty.riskLevel}
                          </div>
                          <div className="text-xs text-slate-400">Risk Level</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{formatCurrency(selectedProperty.totalValue)}</div>
                          <div className="text-xs text-slate-400">Total Value</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Amount */}
                  <div className="space-y-4 mb-6">
                    <Label className="text-white">Investment Amount</Label>

                    {/* Quick Amount Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={investmentAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => setInvestmentAmount(amount)}
                          className={
                            investmentAmount === amount
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "border-slate-700 text-slate-300 hover:bg-slate-800"
                          }
                        >
                          {formatCurrency(amount)}
                        </Button>
                      ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                        placeholder="Enter custom amount"
                        min={selectedProperty.sharePrice}
                        max={user?.balance || 0}
                      />
                    </div>
                  </div>

                  {/* Investment Summary */}
                  <Card className="bg-slate-800 border-slate-700 mb-6">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Shares to purchase</span>
                          <span className="text-white font-semibold">{shares}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total cost</span>
                          <span className="text-white font-semibold">{formatCurrency(totalCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Your balance</span>
                          <span className="text-white">{formatCurrency(user?.balance || 0)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-700">
                          <span className="text-slate-400">Remaining balance</span>
                          <span className={`font-semibold ${(user?.balance || 0) - totalCost >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                            {formatCurrency((user?.balance || 0) - totalCost)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Invest Button */}
                  <Button
                    onClick={handleInvest}
                    disabled={!user || totalCost > (user?.balance || 0) || shares === 0 || isInvesting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    size="lg"
                  >
                    {isInvesting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing Investment...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Invest {formatCurrency(totalCost)}
                      </>
                    )}
                  </Button>

                  {/* Disclaimers */}
                  <div className="text-xs text-slate-500 mt-4 space-y-1">
                    <p>• This is a demo application with simulated transactions</p>
                    <p>• Real estate investments carry risks</p>
                    <p>• Past performance doesn't guarantee future results</p>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Investment Successful!</h3>
                  <p className="text-slate-400 mb-6">
                    You've successfully invested {formatCurrency(totalCost)} in {selectedProperty.title}
                  </p>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Your new investment:</div>
                    <div className="text-lg font-semibold text-white">
                      {shares} shares • {formatCurrency(totalCost)}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}