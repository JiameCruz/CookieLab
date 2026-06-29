// SSR con adapter de Vercel para el panel admin y la API.
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://cookinglab.mx',
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
