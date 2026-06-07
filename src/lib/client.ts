/* // src/lib/client.ts
import { treaty } from '@elysiajs/eden';
import type { App } from '../app/api/[[...slugs]]/route';

// Use the deployed URL in production, or localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// export const client = treaty(API_URL).api;

export const client = treaty<App>(API_URL) */


// This is now just a placeholder – you won't use treaty anymore
export const client = null as any
// Or remove this file and use fetch directly