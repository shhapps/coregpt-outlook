export const {
  VITE_API_URL: API_URL,
  VITE_SENTRY_DSN: SENTRY_DSN,
  VITE_APP_LAUNCH_MODE: APP_LAUNCH_MODE
} = import.meta.env

export const appName = 'ChatGPT AI for Outlook'

export enum StoreNames {
  mainStore = appName,
  chatStore = 'chat-store'
}

export enum ExternalLinks {
  contactUs = 'https://coregptapps.com/contact-us'
}

export enum Theme {
  light = 'light',
  dark = 'dark'
}

export enum LocalStorageKeys {
  theme = 'theme',
  requestId = 'request-id',
  accessToken = 'access-token'
}

export const cssThemeColorVarName = '--theme-color'
export const cssAppColorVarName = '--app-color'

export const conversationIdHeader = 'conversation-id'

export enum AppLaunchModes {
  dev = 'dev',
  prod = 'prod'
}
