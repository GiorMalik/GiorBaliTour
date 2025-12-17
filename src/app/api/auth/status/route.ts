import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      success: true,
      session: session,
      message: session ? 'User is authenticated' : 'User is not authenticated',
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to check authentication status',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}