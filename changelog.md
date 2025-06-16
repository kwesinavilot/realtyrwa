# Changelog

All notable changes to RealtyRWA Social will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2024-12-19

### Added
- **AI-Powered Market Research**: Complete market research system with real-time data analysis
- **Dedicated Market Research Page**: Full-featured `/market-research` page with comprehensive tools
- **AI Chat Assistant**: Real-time chat interface for real estate investment guidance
- **Property AI Analysis**: On-demand AI analysis for individual properties with detailed insights
- **Sonar API Integration**: Advanced AI service integration for market intelligence and property analysis
- **Research Templates**: Pre-built analysis templates for market overview, investment hotspots, risk assessment, and rental market analysis
- **Research History**: Persistent storage and quick access to previous market research results
- **Custom Research Queries**: User-defined research questions with AI-powered responses
- **Market Insights Widget**: Real-time market trends and alerts in sidebar
- **Popular Locations**: Quick-access buttons for commonly researched markets
- **Markdown Rendering**: Rich text formatting for AI responses and analysis results

### Enhanced
- **Property Overlay**: Added AI analysis button to property video overlays
- **Investment Flow**: Integrated AI insights into property evaluation process
- **User Experience**: Comprehensive AI assistance throughout the platform
- **Navigation**: Added market research link to main navigation
- **Store Management**: Extended Zustand store with AI chat and analysis state management

### Technical Implementation
- **API Routes**: Created `/api/market-research`, `/api/property-analysis`, and `/api/chat` endpoints
- **Real Estate Sonar Service**: Custom AI service class for real estate-specific queries
- **Message System**: Structured chat message handling with role-based responses
- **Research Analytics**: User research statistics and activity tracking
- **Responsive Design**: Mobile-optimized AI chat and research interfaces
- **Error Handling**: Comprehensive error management for AI service calls

### Components Created
- **AIChat**: Full-featured chat interface with message history and real-time responses
- **MarketResearchPage**: Comprehensive research dashboard with multiple analysis modes
- **RenderMarkdown**: Rich text rendering component for AI-generated content
- **MarketResearchWidget**: Reusable research component for other pages
- **AI Analysis Integration**: Property-specific AI analysis throughout the platform

### Features
- **Multi-Modal Research**: Quick research, template-based analysis, and custom queries
- **Real-Time Chat**: Instant AI responses to real estate investment questions
- **Research History**: Persistent storage of analysis results with quick re-access
- **Market Intelligence**: Live market trends, ROI insights, and risk assessments
- **Property Analysis**: Individual property evaluation with AI-powered recommendations
- **Global Market Coverage**: Support for international real estate markets
- **Investment Guidance**: Contextual AI advice based on user portfolio and preferences

## [0.3.0] - 2023-06-16

### Fixed
- **Static Export Error**: Removed `generateStaticParams()` function to resolve missing exported function error for dynamic route `/property/[id]`
- **Build Compatibility**: Enabled proper static site generation for dynamic property pages
- **Investment Panel UX**: Fixed issue where success message wasn't visible after investment - panel now stays open to show success state before auto-closing
- **Form Validation**: Simplified signup form by removing password confirmation field and validation

### Added
- `generateStaticParams()` function that fetches all properties and generates static paths for build-time rendering
- Error handling in static params generation with fallback to empty array
- **Investment Panel Integration**: Added InvestmentPanel component to explore page (`/explore`) with full functionality
- **Investment Panel Integration**: Added InvestmentPanel component to property detail page (`/property/[id]`) with full functionality
- **Enhanced Investment Flow**: Investment panel now shows success message for 3 seconds before auto-closing
- **Simplified Signup**: Streamlined signup form to single password field without confirmation

### Enhanced
- **Explore Page**: Investment buttons now properly trigger investment panel for each property
- **Property Detail Page**: "Invest Now" buttons now open investment panel with property-specific data
- **User Experience**: Consistent investment flow across feed, explore, and property detail pages
- **Form UX**: Cleaner signup process with reduced form complexity

### Technical Details
- Resolved Next.js static export requirement for dynamic routes
- Maintained existing functionality while enabling static deployment compatibility
- Updated Zod schema to remove `confirmPassword` field
- Updated `SignupData` type interface to match simplified form
- Added proper investment panel state management across multiple pages
- Implemented consistent investment flow using Zustand store actions

## [0.2.0] - 2025-06-14

### Added
- **Authentication System**: Complete login/signup flow with beautiful glassmorphism design
- **Public Content Access**: Users can now browse all properties without authentication
- **Auth Prompts**: Context-aware modals that appear when unauthenticated users try to interact
- **Protected Routes**: Route protection for sensitive features (upload, portfolio, profile)
- **Explore Page**: Dedicated exploration page for browsing properties
- **User State Management**: Comprehensive authentication state handling with Zustand
- **Progressive Enhancement**: Features unlock smoothly after user authentication

### Changed
- **Navigation Structure**: Simplified to For You, Explore, Login/Sign Up for anonymous users
- **User Experience**: Now follows TikTok's model - browse without signup, authenticate for interactions
- **Header Component**: Dynamic navigation based on authentication state
- **Landing Page**: Streamlined with focus on immediate exploration and sign-up CTAs
- **Feed Access**: Public access to property feed with investment prompts for anonymous users

### Security
- **Route Protection**: Implemented proper authentication checks for sensitive operations
- **Data Access Control**: Restricted certain user data access based on authentication state

### Fixed
- **User Flow**: Removed friction barriers while maintaining security for transactions
- **Mobile Responsiveness**: Improved mobile experience for authentication flows

---

## [0.1.0] - 2025-06-14

### Added
- **Core Platform**: TikTok-style real estate investment platform
- **Video Feed**: Full-screen vertical video player with smooth scrolling navigation
- **Property Upload**: Drag & drop video upload with comprehensive property forms  
- **Portfolio Dashboard**: Investment tracking with performance charts and analytics
- **AI Scoring System**: Engagement-based investment opportunity scoring
- **Mock Web3 Integration**: Simulated wallet connections and blockchain transactions
- **Investment Flow**: Complete investment process with slide-out panels
- **Social Features**: Like, comment, share functionality for property videos
- **Property Details**: Comprehensive property information pages
- **Responsive Design**: Mobile-optimized experience across all devices

### Technical Implementation
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: Zustand for global state
- **Charts**: Recharts for portfolio analytics  
- **Icons**: Lucide React icon library
- **Mock Data**: JSON-based property and user databases

### Components Created
- **Feed Components**: VideoPlayer, PropertyOverlay, InvestmentPanel, NavigationControls, SocialActions
- **Upload Components**: VideoUploader, PropertyForm
- **Portfolio Components**: InvestmentCard, PerformanceChart
- **Shared Components**: Header, AIScoreBadge, WalletConnect

### Pages Implemented
- **Landing Page** (`/`): Hero section with "Invest as you scroll" tagline
- **Feed Page** (`/feed`): TikTok-style property video feed
- **Upload Page** (`/upload`): Property listing interface
- **Portfolio Page** (`/portfolio`): Investment dashboard
- **Property Detail** (`/property/[id]`): Individual property pages

### Features
- **Smooth Navigation**: Keyboard (↑/↓) and mouse wheel scrolling
- **Investment Scoring**: AI-powered opportunity identification
- **Mock Transactions**: Simulated investment flow with wallet integration
- **Performance Tracking**: ROI calculations and portfolio analytics
- **Dark Theme**: Professional dark mode design with gradient accents