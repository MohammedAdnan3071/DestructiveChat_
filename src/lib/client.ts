// src/lib/client.ts
import { treaty } from '@elysiajs/eden';
import type { App } from '../app/api/[[...slugs]]/route';

// Use the deployed URL in production, or localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const client = treaty(API_URL).api;