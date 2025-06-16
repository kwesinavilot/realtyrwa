import { NextRequest, NextResponse } from 'next/server';
import { RealEstateSonarService } from '@/lib/sonar';

export async function POST(request: NextRequest) {
  try {
    const { location, options } = await request.json();
    
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const sonar = new RealEstateSonarService(apiKey);
    const analysis = await sonar.conductMarketResearch(location, options);

    return NextResponse.json({ analysis });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}