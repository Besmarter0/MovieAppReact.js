import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/moviesapp/',  // Replace with your repo name
  plugins: [react()],
});
