import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Vitest config for unit + component tests. Playwright E2E lives separately
// (test:e2e) and is excluded here.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mirror tsconfig's "@/*" -> "./*" path alias.
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e', 'tests-e2e'],
  },
});
