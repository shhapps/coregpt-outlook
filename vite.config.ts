import path, { resolve } from 'path'

import react from '@vitejs/plugin-react'
import devCerts from 'office-addin-dev-certs'
import { defineConfig, loadEnv } from 'vite'
import officeAddin from 'vite-plugin-office-addin'

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions()
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert }
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      officeAddin({
        devUrl: env.VITE_APP_URL,
        prodUrl: env.VITE_APP_URL
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          taskpane: resolve(__dirname, 'taskpane.html'),
          login: resolve(__dirname, 'login.html')
        }
      }
    },
    server: mode !== 'production' ? { https: await getHttpsOptions() } : {}
  }
})
