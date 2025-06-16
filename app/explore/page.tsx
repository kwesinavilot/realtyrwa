'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import InvestmentPanel from '@/components/feed/InvestmentPanel';

import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Eye,
  Heart,
  Loader2
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getProperties } from '@/lib/data';
import { Property } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/web3';
import { getRiskColor } from '@/lib/ai';
import AIScoreBadge from '@/components/shared/AIScoreBadge';
import Link from 'next/link';
import Header from '@/components/shared/Header';

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { properties, setProperties, showAuthPromptModal, isAuthenticated, openInvestmentPanel } = useAppStore();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const propertiesData = await getProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [setProperties]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'low-risk') return matchesSearch && property.riskLevel === 'Low';
    if (selectedFilter === 'high-roi') return matchesSearch && parseFloat(property.roi) > 15;
    if (selectedFilter === 'trending') return matchesSearch && property.aiScore > 80;

    return matchesSearch;
  });

  const handleLike = (propertyId: string) => {
    if (!isAuthenticated) {
      showAuthPromptModal('like');
      return;
    }
    // Handle like logic for authenticated users
  };

  const handleInvest = (property: Property) => {
    if (!isAuthenticated) {
      showAuthPromptModal('invest');
    } else {
      openInvestmentPanel(property);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Explore Properties
            </h1>
            <p className="text-slate-400">
              Discover investment opportunities across the country
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Properties' },
                { key: 'trending', label: 'Trending' },
                { key: 'high-roi', label: 'High ROI' },
                { key: 'low-risk', label: 'Low Risk' },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key)}
                  className={
                    selectedFilter === filter.key
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Properties Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors overflow-hidden group">
                  <div className="relative">
                    <img
                      src={property.thumbnail}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <AIScoreBadge score={property.aiScore} showLabel={false} />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getRiskColor(property.riskLevel)} bg-black/50`}>
                        {property.riskLevel}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLike(property.id)}
                        className="bg-black/50 hover:bg-black/70 text-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-slate-400 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>
                      <p className="text-slate-300 text-sm line-clamp-2">
                        {property.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-slate-400 text-xs mb-1">Share Price</div>
                        <div className="text-white font-semibold">
                          {formatCurrency(property.sharePrice)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs mb-1">Expected ROI</div>
                        <div className="text-white font-semibold">
                          {property.roi}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {formatNumber(property.views)}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {formatNumber(property.likes)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/property/${property.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-700">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleInvest(property)}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No properties found
              </h3>
              <p className="text-slate-400">
                Try adjusting your search criteria or filters
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <InvestmentPanel />
    </>
  );
}