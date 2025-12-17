import { drizzle } from 'drizzle-orm/d1';
import { drizzle as drizzleLocal } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Database connection untuk D1
export function createDB(d1Database?: D1Database) {
  if (d1Database) {
    // Production: Cloudflare D1
    return drizzle(d1Database, { schema });
  } else {
    // Development: Local SQLite dengan libsql
    try {
      const sqlite = createClient({
        url: 'file:./db/tourbalitour.db',
      });
      return drizzleLocal(sqlite, { schema });
    } catch (error) {
      console.error('Failed to initialize local database:', error);
      throw new Error('Database initialization failed');
    }
  }
}

// Untuk Server Components/API Routes
export async function getDB(request?: Request) {
  // Di Cloudflare Pages/Peker, D1 binding tersedia di global
  const d1Database = (globalThis as any).DB || 
                     (request && (request as any).cf?.d1?.DB);
  
  return createDB(d1Database);
}