'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Play,
  Loader2
} from 'lucide-react';
import { getPropertyById } from '@/lib/data';
import { useAppStore } from '@/lib/store';
import { Property } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '@/components/shared/AIScoreBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 105 },
  { month: 'Mar', value: 103 },
  { month: 'Apr', value: 108 },
  { month: 'May', value: 112 },
  { month: 'Jun', value: 115 },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { openInvestmentPanel } = useAppStore();

  useEffect(() => {
    const loadProperty = async () => {
      if (!params.id) return;
      
      try {
        const propertyData = await getPropertyById(params.id as string);
        setProperty(propertyData);
      } catch (error) {
        console.error('Failed to load property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Property Not Found</h2>
          <p className="text-slate-400 mb-4">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()} variant="outline" className="border-slate-700 text-slate-300">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((property.totalShares - property.availableShares) / property.totalShares) * 100;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-700"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => openInvestmentPanel(property)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Invest Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video bg-black rounded-xl overflow-hidden"
            >
              <video
                src={property.videoUrl}
                poster={property.thumbnail}
                controls
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Play Video
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-2xl font-bold text-white">{property.title}</h1>
                        <AIScoreBadge score={property.aiScore} />
                      </div>
                      
                      <div className="flex items-center text-slate-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center space-x-6 text-slate-400">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatNumber(property.views)} views</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatNumber(property.likes)} likes</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatNumber(property.comments)} comments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#f9fafb'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#6366f1"
                          strokeWidth={2}
                          dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Investment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Funding Progress</span>
                      <span className="text-white">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>{formatCurrency((property.totalShares - property.availableShares) * property.sharePrice)} raised</span>
                      <span>{formatCurrency(property.totalValue)} goal</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700 rounded-lg">
                      <div className="text-lg font-bold text-white">{formatCurrency(property.sharePrice)}</div>
                      <div className="text-xs text-slate-400">Per Share</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded-lg">
                      <div className="text-lg font-bold text-white">{property.roi}</div>
                      <div className="text-xs text-slate-400">Expected ROI</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded-lg">
                      <div className={`text-lg font-bold ${getRiskColor(property.riskLevel)}`}>
                        {property.riskLevel}
                      </div>
                      <div className="text-xs text-slate-400">Risk Level</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded-lg">
                      <div className="text-lg font-bold text-white">{formatNumber(property.availableShares)}</div>
                      <div className="text-xs text-slate-400">Available</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => openInvestmentPanel(property)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Invest Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Property Owner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Property Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{property.owner}</h3>
                      <p className="text-sm text-slate-400">Property Owner</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Listed on {new Date(property.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Property Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Value</span>
                    <span className="text-white font-semibold">{formatCurrency(property.totalValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Shares</span>
                    <span className="text-white font-semibold">{formatNumber(property.totalShares)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shares Sold</span>
                    <span className="text-white font-semibold">{formatNumber(property.totalShares - property.availableShares)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI Score</span>
                    <span className="text-white font-semibold">{property.aiScore}/100</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}