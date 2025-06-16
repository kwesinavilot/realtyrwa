'use client';

import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Filter,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getProperties } from '@/lib/data';
import { formatCurrency } from '@/lib/web3';
import InvestmentCard from '@/components/portfolio/InvestmentCard';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import { Property } from '@/lib/types';
import Header from '@/components/shared/Header';

function PortfolioPageContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAppStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const propertiesData = await getProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-slate-400">Please connect your wallet to view your portfolio</p>
        </div>
      </div>
    );
  }

  const totalGainLoss = user.portfolioValue - user.totalInvested;
  const totalGainLossPercentage = user.totalInvested > 0 ? (totalGainLoss / user.totalInvested) * 100 : 0;
  const isPositive = totalGainLoss >= 0;

  const investedProperties = properties.filter(property =>
    user.investments.some(investment => investment.propertyId === property.id)
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Portfolio Dashboard
                </h1>
                <p className="text-slate-400">
                  Track your real estate investments and performance
                </p>
              </div>

              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Portfolio Value</p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(user.portfolioValue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Total Invested</p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(user.totalInvested)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Total P&L</p>
                      <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{formatCurrency(totalGainLoss)}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPositive ? 'bg-green-600/20' : 'bg-red-600/20'
                      }`}>
                      {isPositive ? (
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">ROI</p>
                      <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{totalGainLossPercentage.toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Performance Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mb-8"
          >
            <PerformanceChart />
          </motion.div>

          {/* Portfolio Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Tabs defaultValue="investments" className="space-y-6">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="investments" className="data-[state=active]:bg-slate-700">
                  My Investments ({user.investments.length})
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="data-[state=active]:bg-slate-700">
                  Watchlist (0)
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
                  Transaction History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investments" className="space-y-6">
                {user.investments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.investments.map((investment, index) => {
                      const property = investedProperties.find(p => p.id === investment.propertyId);
                      if (!property) return null;

                      return (
                        <InvestmentCard
                          key={investment.propertyId}
                          property={property}
                          investment={investment}
                          index={index}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-12 text-center">
                      <PieChart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No Investments Yet
                      </h3>
                      <p className="text-slate-400 mb-6">
                        Start building your real estate portfolio by exploring available properties.
                      </p>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        Explore Properties
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="watchlist">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-12 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Watchlist Coming Soon
                    </h3>
                    <p className="text-slate-400">
                      Save properties you're interested in for easy access later.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.investments.map((investment, index) => {
                        const property = investedProperties.find(p => p.id === investment.propertyId);
                        if (!property) return null;

                        return (
                          <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{property.title}</p>
                                <p className="text-slate-400 text-sm">
                                  Investment • {new Date(investment.investedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">
                                {formatCurrency(investment.investedAmount)}
                              </p>
                              <p className="text-slate-400 text-sm">
                                {investment.shares} shares
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <PortfolioPageContent />
    </ProtectedRoute>
  );
}