'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, TrendingUp, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';

const actionConfig = {
  invest: {
    icon: TrendingUp,
    title: 'Start Investing',
    description: 'Create an account to invest in real estate properties and build your portfolio.',
    color: 'text-indigo-500'
  },
  like: {
    icon: Heart,
    title: 'Like Properties',
    description: 'Sign up to like properties and keep track of your favorites.',
    color: 'text-red-500'
  },
  comment: {
    icon: MessageCircle,
    title: 'Join the Conversation',
    description: 'Create an account to comment and engage with the community.',
    color: 'text-blue-500'
  },
  save: {
    icon: Bookmark,
    title: 'Save Properties',
    description: 'Sign up to save properties and create your watchlist.',
    color: 'text-green-500'
  }
};

export default function AuthPrompt() {
  const { showAuthPrompt, authPromptAction, hideAuthPrompt } = useAppStore();
  
  const config = actionConfig[authPromptAction as keyof typeof actionConfig] || actionConfig.invest;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {showAuthPrompt && (
        <Dialog open={showAuthPrompt} onOpenChange={hideAuthPrompt}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={hideAuthPrompt}
                className="absolute -top-2 -right-2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>

              <Card className="bg-transparent border-none shadow-none">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 ${config.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {config.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-slate-400">
                    {config.description}
                  </p>
                  
                  <div className="space-y-3">
                    <Link href="/auth/signup" onClick={hideAuthPrompt}>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                        Create Account
                      </Button>
                    </Link>
                    
                    <Link href="/auth/login" onClick={hideAuthPrompt}>
                      <Button 
                        variant="outline" 
                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                        size="lg"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    Join thousands of investors building their real estate portfolio
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}