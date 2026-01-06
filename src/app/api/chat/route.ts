import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Simple in-memory rate limiting
// Note: For production at scale, use Vercel KV or Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://vaporfy.app',
  'https://www.vaporfy.app',
  'http://localhost:3000', // for local development
];

export async function POST(request: NextRequest) {
  try {
    // 1. Origin verification
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 2. Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // 3. Parse and validate input
    const body = await request.json();
    const { messages, max_tokens = 1024 } = body;

    // Validate messages array exists and is not empty
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate each message has required fields
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return NextResponse.json(
          { error: 'Invalid message format' },
          { status: 400 }
        );
      }

      // Check content length (max 10,000 characters per message)
      if (msg.content.length > 10000) {
        return NextResponse.json(
          { error: 'Input too long. Please shorten your text.' },
          { status: 400 }
        );
      }
    }

    // Cap max_tokens to prevent abuse (max 2000)
    const safeMaxTokens = Math.min(Number(max_tokens) || 1024, 2000);

    // 4. Call Anthropic API
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: safeMaxTokens,
      system: "You are VAPORfy, a satirical tool that parodies AI-generated LinkedIn content. Your job is to rewrite posts with exaggerated 'vapor'—borrowed authority language from high-status domains. The output should be deadpan and completely sincere in tone, never obviously joking. This is parody of how AI writing sounds, not content meant to deceive real audiences. Follow the user's instructions precisely.",
      messages,
    });

    return NextResponse.json(response);
  } catch (error) {
    // 5. Generic error message (don't leak internal details)
    console.error('Anthropic API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
