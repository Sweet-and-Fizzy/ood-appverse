import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibBuild = mode === 'lib'

  return {
    plugins: [react()],

    // Dev server configuration
    // Dev proxy: forwards requests to the Drupal backend so the browser
    // doesn't hit CORS restrictions. The /flag, /user, and /session proxies
    // also inject Access-Control-Allow-Origin and Allow-Credentials headers
    // on the response (Drupal doesn't send them) so the browser will accept
    // credentialed (cookie-based) requests from localhost.
    // None of this applies in production — the widget is served same-origin.
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://md-2622-accessmatch.pantheonsite.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/jsonapi'),
          secure: false,
        },
        // Flag module endpoints (non-JSON:API)
        '/flag': {
          target: 'https://md-2622-accessmatch.pantheonsite.io',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
            });
          }
        },
        // Drupal user endpoints (login_status, etc.)
        '/user': {
          target: 'https://md-2622-accessmatch.pantheonsite.io',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
            });
          }
        },
        // CSRF session token endpoint
        '/session': {
          target: 'https://md-2622-accessmatch.pantheonsite.io',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              // Allow credentials from localhost in dev
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
            });
          }
        }
      }
    },

    // Build configuration
    build: isLibBuild ? {
      // Library build mode - dual output
      lib: {
        entry: resolve(__dirname, 'src/lib/index.js'),
        name: 'AppVerse',
        formats: ['umd', 'es'],
        fileName: (format) => `appverse.${format}.js`,
      },
      rollupOptions: {
        // Bundle React in both UMD and ES formats
        // This is simpler and ensures consistency across formats
        external: [],
        output: [
          // UMD build for CDN (bundles React)
          {
            format: 'umd',
            name: 'AppVerse',
            exports: 'named',
            globals: {},
            assetFileNames: 'appverse[extname]',
          },
          // ES build for npm (React as peer dependency)
          {
            format: 'es',
            exports: 'named',
            assetFileNames: 'appverse[extname]',
          },
        ],
      },
      // Output directory
      outDir: 'dist',
      // Generate sourcemaps for debugging
      sourcemap: true,
      // Minify for production
      minify: 'esbuild',
    } : {
      // Standard app build
      outDir: 'dist',
      sourcemap: true,
    },

    // Define global constants
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'lib' ? 'production' : mode),
    },
  }
})
