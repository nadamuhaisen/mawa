import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plain CSS is used across the project (no Tailwind/PostCSS pipeline needed).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
