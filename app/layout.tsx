import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/shared/Header';
import AuthPrompt from '@/components/shared/AuthPrompt';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RealtyRWA Social - Invest as you scroll',
  description: 'Discover and invest in real estate through short-form videos. AI-powered investment scoring and fractional ownership made simple.',
  keywords: 'real estate, investment, RWA, tokenization, property, fractional ownership',
  authors: [{ name: 'RealtyRWA Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-100`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <AuthPrompt />
      </body>
    </html>
  );
}