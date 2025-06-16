'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, MapPin, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function MarketResearch() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [searchDepth, setSearchDepth] = useState<'quick' | 'detailed' | 'comprehensive'>('detailed');
  
  const { conductMarketResearch, isAnalyzing, currentAnalysis } = useAppStore();

  const handleResearch = async () => {
    if (!location.trim()) return;
    
    try {
      await conductMarketResearch(location, {
        propertyType: propertyType as any,
        searchDepth,
        includeComparables: true
      });
    } catch (error) {
      console.error('Market research failed:', error);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
          Market Research
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Enter location (e.g., Lagos, Nigeria)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="mixed">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={searchDepth} onValueChange={(value: any) => setSearchDepth(value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick">Quick Analysis</SelectItem>
              <SelectItem value="detailed">Detailed Analysis</SelectItem>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={handleResearch}
          disabled={!location.trim() || isAnalyzing}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Researching Market...
            </>
          ) : (
            'Conduct Market Research'
          )}
        </Button>
        
        {currentAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-slate-700 rounded-lg"
          >
            <h4 className="font-semibold text-white mb-2">Market Analysis Results:</h4>
            <div className="text-slate-300 text-sm whitespace-pre-wrap">
              {currentAnalysis}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}