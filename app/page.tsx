'use client';

import Header from '@/components/shared/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PlayCircle,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Smartphone,
  ChevronRight,
  Star,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Scoring',
    description: 'Advanced algorithms analyze engagement metrics to identify high-potential investment opportunities.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Fractional Ownership',
    description: 'Invest in premium real estate with as little as $25. No minimum investment barriers.',
    color: 'text-blue-500'
  },
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Blockchain-based transactions ensure security and transparency in every investment.',
    color: 'text-green-500'
  },
  {
    icon: Smartphone,
    title: 'Social Investing',
    description: 'Discover properties through engaging video content and invest with a single tap.',
    color: 'text-purple-500'
  }
];

const stats = [
  { label: 'Properties Listed', value: '1,250+', icon: TrendingUp },
  { label: 'Total Invested', value: '$2.4M', icon: TrendingUp },
  { label: 'Active Investors', value: '3,200+', icon: Users },
  { label: 'Average ROI', value: '14.2%', icon: Star },
];

const demoProperties = [
  {
    title: "Modern Manhattan Loft",
    location: "New York, NY",
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=400",
    roi: "12.5%",
    price: "$250",
    aiScore: 92
  },
  {
    title: "Miami Beach Condo",
    location: "Miami, FL",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
    roi: "15.2%",
    price: "$180",
    aiScore: 88
  },
  {
    title: "Austin Tech Hub Office",
    location: "Austin, TX",
    image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=400",
    roi: "18.7%",
    price: "$95",
    aiScore: 76
  }
];

export default function HomePage() {
  const { isAuthenticated } = useAppStore();

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <Badge className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30 px-4 py-2 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Real Estate Investment
                </Badge>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Invest
                </span>{' '}
                as you scroll
              </h1>

              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover premium real estate investments through engaging short-form videos.
                AI-powered scoring helps you identify the best opportunities while you scroll.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/feed">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Exploring
                  </Button>
                </Link>

                <Link href={isAuthenticated ? "/feed" : "/auth/signup"}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                  >
                    {isAuthenticated ? "Go to Feed" : "Get Started"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Demo Section */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">See What's Available</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Browse through premium real estate opportunities from across the country
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {demoProperties.map((property, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors overflow-hidden">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-indigo-600 text-white">
                          🔥 {property.aiScore}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold mb-1">{property.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{property.location}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-slate-400 text-xs">Share Price</div>
                          <div className="text-white font-semibold">{property.price}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">Expected ROI</div>
                          <div className="text-green-500 font-semibold">{property.roi}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/feed">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  View All Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-indigo-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose RealtyRWA?
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Revolutionary features that make real estate investing accessible,
                transparent, and profitable for everyone.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors h-full">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center ${feature.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-3">
                              {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 rounded-2xl p-12 border border-indigo-500/20"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Investing?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of investors who are already building their real estate portfolio
                through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/feed">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Exploring
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link href="/auth/signup">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}