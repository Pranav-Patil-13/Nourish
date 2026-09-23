import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    fs: {
      strict: false,
      allow: [
        __dirname,
        path.resolve(__dirname, '..'),
        '/Users/pranavpatil/Desktop/Health:Calorie_Tracker',
      ],
    },
  },
});

