import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

// Load environment variables from .env.test for testing
// (Use .env.local for local dev when running the app)
dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: [],
  },
});
