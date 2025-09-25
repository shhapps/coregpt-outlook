/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_URL: string
  readonly VITE_AZURE_APP_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
