import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    // For local development
    url: process.env.NODE_ENV === 'production' 
      ? 'cloudflare-d1://807c8495-fd0f-432f-be9c-050c0f527d18'
      : './db/tourbalitour.db',
  },
  verbose: true,
  strict: true,
} satisfies Config;