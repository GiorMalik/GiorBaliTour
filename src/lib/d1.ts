import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// Database connection untuk Cloudflare D1 Production
export function createDB(d1Database?: D1Database) {
  // Production: Cloudflare D1
  if (d1Database) {
    return drizzle(d1Database, { schema });
  }
  
  // Fallback untuk development environment
  throw new Error('D1 database binding required. Make sure D1 is properly configured.');
}

// Untuk Server Components/API Routes
export async function getDB(request?: Request) {
  // Di Cloudflare Pages/Peker, D1 binding tersedia di global
  const d1Database = (globalThis as any).DB || 
                     (request && (request as any).cf?.d1?.DB);
  
  if (!d1Database) {
    throw new Error('D1 database binding not found. Check wrangler.toml configuration.');
  }
  
  return createDB(d1Database);
}