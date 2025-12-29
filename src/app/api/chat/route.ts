import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, max_tokens = 1024 } = body;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens,
      messages,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Anthropic API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
