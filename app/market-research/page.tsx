'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  MapPin, 
  Loader2, 
  Search,
  BarChart3,
  Globe,
  Building,
  DollarSign,
  Target,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Header from '@/components/shared/Header';
import RenderMarkdown from '@/components/shared/RenderMarkdown';

const popularLocations = [
  'Lagos, Nigeria',
  'Accra, Ghana', 
  'Nairobi, Kenya',
  'Cairo, Egypt',
  'Cape Town, South Africa',
  'New York, NY',
  'Miami, FL',
  'Austin, TX'
];

const researchTemplates = [
  {
    title: 'Market Overview',
    description: 'Get a comprehensive overview of the real estate market',
    prompt: 'Provide a comprehensive real estate market overview for [LOCATION] including current trends, pricing, and investment opportunities.'
  },
  {
    title: 'Investment Hotspots',
    description: 'Discover the best areas for property investment',
    prompt: 'Identify the top investment hotspots in [LOCATION] with highest growth potential and rental yields.'
  },
  {
    title: 'Risk Assessment',
    description: 'Analyze market risks and stability factors',
    prompt: 'Analyze the real estate investment risks in [LOCATION] including market stability, economic factors, and regulatory considerations.'
  },
  {
    title: 'Rental Market Analysis',
    description: 'Deep dive into rental market dynamics',
    prompt: 'Provide detailed rental market analysis for [LOCATION] including average rents, vacancy rates, and tenant demand.'
  }
];

export default function MarketResearchPage() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [searchDepth, setSearchDepth] = useState<'quick' | 'detailed' | 'comprehensive'>('detailed');
  const [customPrompt, setCustomPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('quick-research');
  const [researchHistory, setResearchHistory] = useState<Array<{
    location: string;
    timestamp: Date;
    analysis: string;
    type: string;
  }>>([]);
  
  const { conductMarketResearch, isAnalyzing, currentAnalysis, setCurrentAnalysis } = useAppStore();

  const handleQuickResearch = async (selectedLocation?: string) => {
    const targetLocation = selectedLocation || location;
    if (!targetLocation.trim()) return;
    
    try {
      const analysis = await conductMarketResearch(targetLocation, {
        propertyType: propertyType as any,
        searchDepth,
        includeComparables: true
      });
      
      // Add to history
      setResearchHistory(prev => [{
        location: targetLocation,
        timestamp: new Date(),
        analysis,
        type: 'Market Overview'
      }, ...prev.slice(0, 9)]); // Keep last 10 searches
      
    } catch (error) {
      console.error('Market research failed:', error);
    }
  };

  const handleTemplateResearch = async (template: typeof researchTemplates[0]) => {
    if (!location.trim()) return;
    
    const prompt = template.prompt.replace('[LOCATION]', location);
    
    try {
      const analysis = await conductMarketResearch(location, {
        propertyType: propertyType as any,
        searchDepth: 'comprehensive',
        includeComparables: true
      });
      
      setResearchHistory(prev => [{
        location,
        timestamp: new Date(),
        analysis,
        type: template.title
      }, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Template research failed:', error);
    }
  };

  const handleCustomResearch = async () => {
    if (!location.trim() || !customPrompt.trim()) return;
    
    try {
      // You can extend the API to accept custom prompts
      const analysis = await conductMarketResearch(location, {
        propertyType: propertyType as any,
        searchDepth: 'comprehensive',
        includeComparables: true
      });
      
      setResearchHistory(prev => [{
        location,
        timestamp: new Date(),
        analysis,
        type: 'Custom Analysis'
      }, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Custom research failed:', error);
    }
  };

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
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-indigo-500" />
              Market Research
            </h1>
            <p className="text-slate-400">
              Get AI-powered insights into real estate markets worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Research Panel */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Research Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-700">
                      <TabsTrigger value="quick-research" className="text-slate-300">Quick Research</TabsTrigger>
                      <TabsTrigger value="templates" className="text-slate-300">Templates</TabsTrigger>
                      <TabsTrigger value="custom" className="text-slate-300">Custom</TabsTrigger>
                    </TabsList>
                    
                    {/* Quick Research Tab */}
                    <TabsContent value="quick-research" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="mixed">Mixed Use</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Select value={searchDepth} onValueChange={(value: any) => setSearchDepth(value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">Quick Analysis (2-3 min)</SelectItem>
                          <SelectItem value="detailed">Detailed Analysis (3-5 min)</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive (5-8 min)</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        onClick={() => handleQuickResearch()}
                        disabled={!location.trim() || isAnalyzing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Researching Market...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Start Research
                          </>
                        )}
                      </Button>
                      
                      {/* Popular Locations */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-3">Popular Locations</h4>
                        <div className="flex flex-wrap gap-2">
                          {popularLocations.map((loc) => (
                            <Badge
                              key={loc}
                              variant="outline"
                              className="cursor-pointer border-slate-600 text-slate-300 hover:bg-slate-700"
                              onClick={() => handleQuickResearch(loc)}
                            >
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Templates Tab */}
                    <TabsContent value="templates" className="space-y-4">
                      <div className="relative mb-4">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Enter location for template analysis"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {researchTemplates.map((template, index) => (
                          <Card key={index} className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-white">{template.title}</h4>
                                <div className="text-slate-400">
                                  {template.title === 'Market Overview' && <Globe className="w-4 h-4" />}
                                  {template.title === 'Investment Hotspots' && <Target className="w-4 h-4" />}
                                  {template.title === 'Risk Assessment' && <AlertTriangle className="w-4 h-4" />}
                                  {template.title === 'Rental Market Analysis' && <Building className="w-4 h-4" />}
                                </div>
                              </div>
                              <p className="text-sm text-slate-300 mb-3">{template.description}</p>
                              <Button
                                onClick={() => handleTemplateResearch(template)}
                                disabled={!location.trim() || isAnalyzing}
                                size="sm"
                                className="w-full bg-indigo-600 hover:bg-indigo-700"
                              >
                                Run Analysis
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    {/* Custom Tab */}
                    <TabsContent value="custom" className="space-y-4">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Enter location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      
                      <textarea
                        placeholder="Enter your custom research question or analysis request..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm resize-none"
                        rows={4}
                      />
                      
                      <Button
                        onClick={handleCustomResearch}
                        disabled={!location.trim() || !customPrompt.trim() || isAnalyzing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Run Custom Analysis'
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Results */}
              {currentAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderMarkdown text={currentAnalysis} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Research History */}
              <Card className="bg-slate-800 border-slate-700">
                                <CardHeader>
                  <CardTitle className="text-white text-lg">Recent Research</CardTitle>
                </CardHeader>
                <CardContent>
                  {researchHistory.length === 0 ? (
                    <p className="text-slate-400 text-sm">No research history yet</p>
                  ) : (
                    <div className="space-y-3">
                      {researchHistory.slice(0, 5).map((item, index) => (
                        <div
                          key={index}
                          className="p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                          onClick={() => setCurrentAnalysis(item.analysis)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-sm font-medium">{item.location}</span>
                            <Badge variant="outline" className="text-xs border-slate-500 text-slate-300">
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-xs">
                            {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Market Insights */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-white text-sm font-medium">Hot Markets</span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Lagos and Nairobi showing strong growth in Q4 2024
                    </p>
                  </div>
                  
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-white text-sm font-medium">Best ROI</span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Accra residential properties averaging 15.2% returns
                    </p>
                  </div>
                  
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-white text-sm font-medium">Market Alert</span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Monitor currency fluctuations in emerging markets
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Stats */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Research Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400">{researchHistory.length}</div>
                      <div className="text-xs text-slate-400">Analyses Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {new Set(researchHistory.map(h => h.location)).size}
                      </div>
                      <div className="text-xs text-slate-400">Markets Studied</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tips */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Research Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">💡 Pro Tip:</strong> Use comprehensive analysis for major investment decisions
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">🎯 Focus:</strong> Compare 2-3 similar markets before investing
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong className="text-white">⏰ Timing:</strong> Research markets during local business hours for better data
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
