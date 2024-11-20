import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Nyaa Filters',
        description: '[description]',
        icon: 'https://nyaa.si/static/favicon.png',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://nyaa.si/*'],
      },
      server: {
        open: false,
      },
    }),
  ],
})
