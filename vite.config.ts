import { defineConfig } from '@lovable.dev/vite-tanstack-config';

// TanStack Start SSR configuration
export default defineConfig({
  tanstackStart: {
    server: { entry: 'server' },
  },
});
