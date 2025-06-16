# 🏠 RealtyRWA

> **Invest As You Scroll** - A TikTok-style real estate investment platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

RealtyRWA Social is a revolutionary web platform that combines the addictive scrolling experience of TikTok with real estate investment opportunities. Property owners upload short videos of their spaces, while users can discover, analyze, and invest in properties through fractional ownership powered by AI and Web3 tokenization.

![RealtyRWA Demo](./public/demo-screenshot.png)

## ✨ Features

### 🎥 **TikTok-Style Discovery**
- Full-screen vertical video feed with smooth scrolling
- Keyboard navigation (↑/↓ arrows) and mouse wheel support
- Auto-play videos as you scroll through properties
- Immediate access - no signup required to browse

### 🤖 **AI-Powered Investment Intelligence**
- **Real-time Property Analysis**: AI-powered investment scoring and risk assessment
- **Smart Market Research**: Comprehensive market analysis with live data from global sources
- **AI Chat Assistant**: 24/7 real estate investment advisor powered by Perplexity AI
- **Predictive Analytics**: ROI predictions and market trend analysis
- Color-coded investment opportunity badges (🔥 90-100, ⚡ 70-89, 📈 50-69, 📊 <50)

### 📊 **Advanced Market Research**
- **Dedicated Research Hub**: Comprehensive market analysis tools
- **Multiple Research Modes**: Quick analysis, template-based research, and custom queries
- **Global Market Coverage**: Real-time insights from markets worldwide
- **Research Templates**: Pre-built analysis for market overview, investment hotspots, risk assessment, and rental analysis
- **Research History**: Save and revisit previous market analyses
- **Popular Markets**: One-click research for trending locations

### 💰 **Fractional Real Estate Investment**
- Invest as little as $25 in premium properties
- Mock Web3 wallet integration (MetaMask simulation)
- Real-time portfolio tracking and analytics
- Transparent fee structure and investment history

### 📱 **Social Investment Experience**
- Like, comment, and share property videos
- Follow property owners and other investors
- Community-driven investment insights
- Social proof through engagement metrics

### 🏗️ **Property Listing Platform**
- Drag & drop video upload interface
- Comprehensive property information forms
- Preview functionality with overlay simulation
- Instant publishing and investor reach

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
# Clone the repository
git clone https://github.com/kwesinavilot/realtyrwa.git
cd realtyrwa

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Tech Stack

### **Core Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with latest features


### **AI & Analytics**
- **Perplexity AI** - Real-time market research and analysis
- **Custom AI Service** - Property analysis and investment scoring
- **Real-time Data** - Live market insights and trends

### **Styling & UI**
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

### **State Management**
- **Zustand** - Lightweight state management
- **React Hooks** - Local component state

### **Data & Charts**
- **JSON Mock Data** - Simulated API responses
- **Recharts** - Interactive data visualization
- **Local Storage** - Client-side data persistence

### **Web3 Integration**
- **ethers.js** - Ethereum library (mock implementation)
- **Wallet Connect** - Multi-wallet support simulation

## 📁 Project Structure

```
realtyrwa/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/               
│   │   └── signup/              
│   ├── explore/                  # Property exploration
│   ├── feed/                     # Main video feed
│   ├── portfolio/                # User investments
│   ├── property/[id]/           # Property details
│   ├── upload/                   # Property listing
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── auth/                    # Authentication forms
│   ├── feed/                    # Video feed components
│   ├── portfolio/               # Investment tracking
│   ├── shared/                  # Common components
│   ├── ui/                      # shadcn/ui components
│   └── upload/                  # Property listing
├── data/                        # Mock databases
│   ├── properties.json         # Property data
│   └── users.json              # User data
├── lib/                         # Utility libraries
│   ├── ai.ts                   # Investment scoring
│   ├── data.ts                 # Data management
│   ├── store.ts                # Zustand stores
│   ├── types.ts                # TypeScript types
│   ├── utils.ts                # Helper functions
│   └── web3.ts                 # Mock Web3 integration
└── public/                      # Static assets
    ├── images/                 # Property images
    └── videos/                 # Sample videos
```

## 🎯 User Experience

### **Anonymous Users**
- ✅ Browse all properties and videos
- ✅ View investment details and AI scores
- ✅ Access basic market research
- ✅ Use AI chat assistant (limited)
- ✅ Explore different property types and locations
- ❌ Cannot invest, like, comment, or upload
- 💡 Gentle prompts to sign up for interactive features

### **Authenticated Users**
- ✅ Full platform access and interactions
- ✅ Investment capabilities with portfolio tracking
- ✅ Property upload and management
- ✅ Social features (like, comment, share)
- ✅ Unlimited AI market research
- ✅ Full AI chat assistant access
- ✅ Personalized recommendations and analysis

## 🤖 AI Features

### **Market Research Hub** (`/market-research`)
- **Quick Research**: Fast market overviews with key metrics
- **Template Analysis**: Pre-built research for specific needs
  - Market Overview: Comprehensive market analysis
  - Investment Hotspots: Best areas for investment
  - Risk Assessment: Market stability and risk factors
  - Rental Market Analysis: Rental yields and demand
- **Custom Research**: User-defined analysis queries
- **Research History**: Save and revisit previous analyses
- **Global Coverage**: Real-time data from worldwide markets

### **AI Chat Assistant**
- 24/7 real estate investment advisor
- Context-aware conversations about properties
- Market trend analysis and predictions
- Investment strategy recommendations
- Portfolio optimization advice

### **Property Analysis**
- Real-time AI scoring of investment opportunities
- Risk assessment and ROI predictions
- Market comparison and competitive analysis
- Investment recommendations based on user profile


## 🔐 Authentication Flow

### **Sign Up Process**
1. **Name** - Full name for account
2. **Username** - Unique platform identifier  
3. **Email/Phone** - Contact information
4. **Password** - Secure account access
5. **Account Creation** - Instant platform access

### **Login Process**
1. **Username/Email** - Account identifier
2. **Password** - Account verification
3. **Dashboard Access** - Full feature unlock

## 📊 Investment Features

### **AI Scoring Algorithm**
```typescript
const calculateAIScore = (property: Property) => {
  const viewsWeight = 0.3;
  const likesWeight = 0.4;
  const commentsWeight = 0.3;
  
  return (
    (property.views * viewsWeight) +
    (property.likes * likesWeight) +
    (property.comments * commentsWeight)
  );
};
```

### **Investment Options**
- **Quick Invest**: $25, $50, $100 preset amounts
- **Custom Amount**: Any amount within available shares
- **Portfolio Tracking**: Real-time value and ROI updates
- **Risk Assessment**: Low, Medium, High risk categorization

## 🌍 Market Coverage

### **Supported Regions**
- **Africa**: Nigeria (Lagos), Ghana (Accra), Kenya (Nairobi), Egypt (Cairo), South Africa (Cape Town)
- **North America**: United States (New York, Miami, Austin), Canada
- **Europe**: United Kingdom, Germany, France
- **Asia**: Singapore, Dubai, India
- **Custom Locations**: Any location worldwide via AI research

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Docker**
```bash
docker build -t realtyrwa .
docker run -p 3000:3000 realtyrwa
```

### **Environment Variables**
```env
# Add to .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB3_NETWORK=goerli
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📱 Mobile Support

RealtyRWA is fully responsive and optimized for:
- **Desktop**: Full TikTok-style experience with sidebar controls
- **Tablet**: Touch-optimized navigation and investment flows  
- **Mobile**: Stack layout with bottom action bars

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Support

- **Documentation**: [https://docs.realtyrwa.com](https://docs.realtyrwa.com)
- **Issues**: [GitHub Issues](https://github.com/kwesinavilot/realtyrwa/issues)
- **Email**: support@realtyrwa.com
- **Discord**: [Join our community](https://discord.gg/realtyrwa)

---

<div align="center">
  <p>Built with ❤️ by the RealtyRWA Team</p>
  <p>
    <a href="https://realtyrwa.com">Website</a> •
    <a href="https://twitter.com/realtyrwa">Twitter</a> •
    <a href="https://linkedin.com/company/realtyrwa">LinkedIn</a>
  </p>
</div>