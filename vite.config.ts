import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'https://blog.adproqwq.xyz',
        name: 'DOMAction',
        author: 'Adpro',
        match: ['*://*/*'],
      },
    }),
  ],
});
