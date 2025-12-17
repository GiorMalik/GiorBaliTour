import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/d1';

export async function GET() {
  try {
    console.log('🔍 Testing D1 database connection...');
    
    // Test database connection
    const db = await getDB();
    
    // Test query untuk melihat tabel yang ada
    const tables = await db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name IN ('users', 'cars', 'reviews')
    `).all();
    
    console.log('📋 Tables found:', tables);
    
    // Test basic query
    let testResults = {};
    
    if (tables.results && tables.results.length > 0) {
      for (const table of tables.results) {
        try {
          const count = await db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
          testResults[table.name] = count?.count || 0;
        } catch (error) {
          testResults[table.name] = `Error: ${error.message}`;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'D1 database connection successful',
      tables: tables.results || [],
      testResults,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'D1 database connection failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    console.log('🚀 Initializing GiorBaliTour database...');
    
    const db = await getDB();
    
    // Create tables manually
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user' NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS cars (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        transmission TEXT NOT NULL,
        price_per_day REAL NOT NULL,
        image_filename TEXT NOT NULL,
        description TEXT,
        available INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        car_id TEXT NOT NULL,
        user_id TEXT,
        user_name TEXT NOT NULL,
        comment TEXT NOT NULL,
        rating INTEGER NOT NULL,
        is_verified INTEGER DEFAULT 0 NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);
    
    // Create unique index for users email
    await db.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email);
    `);
    
    console.log('✅ Database tables created successfully');
    
    return NextResponse.json({
      success: true,
      message: 'GiorBaliTour database initialized successfully',
      tables: ['users', 'cars', 'reviews'],
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Database initialization failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}