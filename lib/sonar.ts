// Types for Real Estate Sonar API
export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type MarketResearchOptions = {
  location?: string;
  propertyType?: 'residential' | 'commercial' | 'industrial' | 'mixed';
  searchDepth?: 'quick' | 'detailed' | 'comprehensive';
  includeComparables?: boolean;
};

export type PropertyAnalysisRequest = {
  propertyId: string;
  location: string;
  propertyType: string;
  price: number;
  features?: string[];
};

export interface SonarApiResponse {
  choices?: Array<{
    message?: {
      content?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;
  [key: string]: any;
}

// Real Estate focused system prompts
const MARKET_RESEARCH_PROMPT = `
You are a senior real estate market analyst with expertise in African and global property markets. 
Your role is to provide accurate, data-driven market insights for real estate investors.

Focus on:
- Current market trends and pricing
- Investment opportunities and risks
- Rental yields and ROI projections
- Economic factors affecting property values
- Comparative market analysis
- Future market predictions

Always provide specific, actionable insights with supporting data when available.
Be concise but comprehensive in your analysis.
`;

const PROPERTY_ANALYSIS_PROMPT = `
You are an expert property investment advisor specializing in real estate valuation and investment analysis.
Your role is to analyze individual properties and provide investment recommendations.

Analyze properties based on:
- Location desirability and growth potential
- Property condition and features
- Market comparables and pricing
- Rental potential and yields
- Investment risks and opportunities
- Exit strategy considerations

Provide clear investment ratings and recommendations with reasoning.
`;

const CHAT_ASSISTANT_PROMPT = `
You are a knowledgeable real estate investment assistant helping users make informed property investment decisions.
You have expertise in global real estate markets, particularly in Africa (Ghana, Nigeria, Kenya, Egypt, South Africa).

Provide helpful, accurate information about:
- Property investment strategies
- Market conditions and trends
- Investment calculations (ROI, rental yields, etc.)
- Risk assessment
- Portfolio diversification
- Real estate financing options

Be conversational, helpful, and always prioritize the user's investment goals and risk tolerance.
`;

// Utility: Promise with timeout
async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Request timed out. Please try again.'));
    }, ms);
  });
  return Promise.race([
    promise.then((result) => {
      clearTimeout(timeoutId);
      return result;
    }),
    timeoutPromise
  ]);
}

export class RealEstateSonarService {
  private apiKey: string;
  private baseUrl: string = 'https://api.perplexity.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetchApi(path: string, body: any): Promise<any> {
    // const fetch = require('node-fetch');
    const timeoutMs = 30000; // 30 seconds for real-time feel

    try {
      return await withTimeout(
        fetch(`${this.baseUrl}${path}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(async (response: any) => {
          if (!response.ok) throw new Error(await response.text());
          return await response.json();
        }),
        timeoutMs
      );
    } catch (err: any) {
      throw new Error(`Market research service unavailable: ${err.message}`);
    }
  }

  /**
   * Conduct real-time market research for a specific location
   */
  async conductMarketResearch(
    location: string, 
    options: MarketResearchOptions = {}
  ): Promise<string> {
    const searchDepthMap = {
      'quick': 'low',
      'detailed': 'medium', 
      'comprehensive': 'high'
    };

    const prompt = `
    Conduct a comprehensive real estate market analysis for ${location}.
    
    Property Type Focus: ${options.propertyType || 'all types'}
    Analysis Requirements:
    - Current market conditions and pricing trends
    - Average property values and rental rates
    - Investment opportunities and hotspots
    - Market growth projections
    - Economic factors affecting the market
    - Risk assessment for investors
    ${options.includeComparables ? '- Comparable markets and benchmarking' : ''}
    
    Provide actionable insights for real estate investors considering this market.
    `;

    const messages: Message[] = [
      { role: 'system', content: MARKET_RESEARCH_PROMPT },
      { role: 'user', content: prompt }
    ];

    const response = await this.fetchApi('/chat/completions', {
      model: 'sonar',
      messages,
      web_search_options: { 
        search_context_size: searchDepthMap[options.searchDepth || 'detailed'] 
      }
    });

    return this.extractContent(response);
  }

  /**
   * Analyze a specific property for investment potential
   */
  async analyzeProperty(propertyData: PropertyAnalysisRequest): Promise<string> {
    const prompt = `
    Analyze this property for investment potential:
    
    Location: ${propertyData.location}
    Property Type: ${propertyData.propertyType}
    Listed Price: $${propertyData.price.toLocaleString()}
    ${propertyData.features ? `Features: ${propertyData.features.join(', ')}` : ''}
    
    Provide analysis on:
    1. Price competitiveness vs market
    2. Investment potential and expected ROI
    3. Rental yield projections
    4. Market appreciation potential
    5. Risk factors and considerations
    6. Investment recommendation (Buy/Hold/Pass)
    
    Include specific reasoning for your recommendation.
    `;

    const messages: Message[] = [
      { role: 'system', content: PROPERTY_ANALYSIS_PROMPT },
      { role: 'user', content: prompt }
    ];

    const response = await this.fetchApi('/chat/completions', {
      model: 'sonar',
      messages,
      web_search_options: { search_context_size: 'medium' }
    });

    return this.extractContent(response);
  }

  /**
   * Chat with real estate investment assistant
   */
  async chatWithAssistant(
    userMessage: string, 
    conversationHistory: Message[] = []
  ): Promise<string> {
    const messages: Message[] = [
      { role: 'system', content: CHAT_ASSISTANT_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await this.fetchApi('/chat/completions', {
      model: 'sonar',
      messages,
      web_search_options: { search_context_size: 'medium' }
    });

    return this.extractContent(response);
  }

  /**
   * Get market comparison between multiple locations
   */
  async compareMarkets(locations: string[]): Promise<string> {
    const prompt = `
    Compare the real estate investment potential across these markets: ${locations.join(', ')}.
    
    For each market, analyze:
    - Current property values and trends
    - Rental yields and investment returns
    - Market growth potential
    - Economic stability and growth drivers
    - Investment risks and opportunities
    - Ease of property acquisition for foreign investors
    
    Rank these markets for real estate investment attractiveness and explain your reasoning.
    `;

    const messages: Message[] = [
      { role: 'system', content: MARKET_RESEARCH_PROMPT },
      { role: 'user', content: prompt }
    ];

    const response = await this.fetchApi('/chat/completions', {
      model: 'sonar',
      messages,
      web_search_options: { search_context_size: 'high' }
    });

    return this.extractContent(response);
  }

  /**
   * Get investment insights for a user's portfolio
   */
  async getPortfolioInsights(
    currentInvestments: Array<{location: string, value: number, propertyType: string}>,
    investmentGoals: string
  ): Promise<string> {
    const portfolioSummary = currentInvestments.map(inv => 
      `${inv.location} (${inv.propertyType}): $${inv.value.toLocaleString()}`
    ).join(', ');

    const prompt = `
    Analyze this real estate investment portfolio and provide strategic insights:
    
    Current Portfolio: ${portfolioSummary}
    Investment Goals: ${investmentGoals}
    
    Provide analysis on:
    1. Portfolio diversification assessment
    2. Geographic and property type balance
    3. Risk exposure evaluation
    4. Growth opportunities and gaps
    5. Recommended next investments
    6. Portfolio optimization strategies
    
    Focus on actionable recommendations for portfolio improvement.
    `;

    const messages: Message[] = [
      { role: 'system', content: PROPERTY_ANALYSIS_PROMPT },
      { role: 'user', content: prompt }
    ];

    const response = await this.fetchApi('/chat/completions', {
      model: 'sonar',
      messages,
      web_search_options: { search_context_size: 'medium' }
    });

    return this.extractContent(response);
  }

  private extractContent(response: SonarApiResponse): string {
    return response?.choices?.[0]?.message?.content?.trim() || 'Unable to generate response. Please try again.';
  }
}

// Convenience functions for easy integration
export async function getMarketInsights(
  location: string, 
  apiKey: string,
  options?: MarketResearchOptions
): Promise<string> {
  const service = new RealEstateSonarService(apiKey);
  return service.conductMarketResearch(location, options);
}

export async function analyzePropertyInvestment(
  propertyData: PropertyAnalysisRequest,
  apiKey: string
): Promise<string> {
  const service = new RealEstateSonarService(apiKey);
  return service.analyzeProperty(propertyData);
}

export async function chatWithRealEstateAI(
  message: string,
  apiKey: string,
  history?: Message[]
): Promise<string> {
  const service = new RealEstateSonarService(apiKey);
  return service.chatWithAssistant(message, history);
}
