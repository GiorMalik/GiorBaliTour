import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDB } from '@/lib/d1';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
        message: 'You must be logged in to register'
      }, { status: 401 });
    }

    const { name, email, password, role = 'user' } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'Name, email, and password are required'
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        error: 'Password too short',
        message: 'Password must be at least 6 characters long'
      }, { status: 400 });
    }

    const db = await getDB();

    // Check if user already exists
    const existingUser = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).get();
    
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User already exists',
        message: 'A user with this email already exists'
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userId = nanoid();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      INSERT INTO users (id, name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(userId, name, email, hashedPassword, role, now, now).run();

    console.log(`✅ User registered: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userId,
        name,
        email,
        role
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to register user',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}