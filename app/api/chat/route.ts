import { NextRequest, NextResponse } from 'next/server';
import { RealEstateSonarService } from '@/lib/sonar';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();
    
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const sonar = new RealEstateSonarService(apiKey);
    const response = await sonar.chatWithAssistant(message, history);

    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}