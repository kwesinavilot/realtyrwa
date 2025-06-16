'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import RenderMarkdown from '../shared/RenderMarkdown';

export default function AIChat() {
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        isChatOpen,
        chatMessages,
        toggleChat,
        sendChatMessage
    } = useAppStore();

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const message = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        try {
            await sendChatMessage(message);
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <AnimatePresence>
            {isChatOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={toggleChat}
                    />

                    {/* Chat Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 z-50 flex flex-col overflow-y-auto"
                    >
                        <Card className="h-full bg-slate-900 border-slate-800 rounded-none">
                            <CardHeader className="border-b border-slate-800">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white flex items-center">
                                        <Bot className="w-5 h-5 mr-2 text-indigo-500" />
                                        AI Assistant
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={toggleChat}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col p-0">
                                {/* Messages */}
                                <ScrollArea className="flex-1 p-4">
                                    <div className="space-y-4">
                                        {chatMessages.length === 0 && (
                                            <div className="text-center text-slate-400 py-8">
                                                <Bot className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                                                <p>Ask me anything about real estate investing!</p>
                                                <p className="text-sm mt-2">Try: "What's the market like in Lagos?" or "Analyze this property"</p>
                                            </div>
                                        )}

                                        {chatMessages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-slate-800 text-slate-200'
                                                        }`}
                                                >
                                                    <div className="flex items-start space-x-2">
                                                        {message.role === 'assistant' && (
                                                            <Bot className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                                                        )}
                                                        {message.role === 'user' && (
                                                            <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />
                                                        )}
                                                        <div className="text-sm whitespace-pre-wrap">
                                                            <RenderMarkdown
                                                                text={message.content}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-slate-800 text-slate-200 rounded-lg p-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Bot className="w-4 h-4 text-indigo-400" />
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span className="text-sm">Thinking...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>

                                {/* Input */}
                                <div className="border-t border-slate-800 p-4">
                                    <div className="flex space-x-2">
                                        <Input
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask about real estate..."
                                            className="!whitespace-pre-wrap bg-slate-800 border-slate-700 text-white"
                                            style={{ whiteSpace: 'pre-wrap' }}
                                            disabled={isLoading}
                                        />


                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!inputMessage.trim() || isLoading}
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
