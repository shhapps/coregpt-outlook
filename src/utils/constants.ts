export const {
  VITE_API_URL: API_URL,
  VITE_APP_URL: APP_URL,
  VITE_AZURE_APP_CLIENT_ID: AZURE_APP_CLIENT_ID,
  VITE_SENTRY_DSN: SENTRY_DSN,
  VITE_APP_LAUNCH_MODE: APP_LAUNCH_MODE
} = import.meta.env

export enum COMMON_MESSAGES {
  officeIsNotFullyLoaded = 'Office is not loaded fully.',
  popUpBlocked = 'Popup blocked. Adjust browser settings or try a different browser.',
  dialogIgnored = 'Please allow the dialog to proceed.',
  dialogAlreadyOpened = 'Dialog already opened',
  somethingWentWrong = 'Something went wrong. Please try again.'
}

export const appName = 'ChatGPT AI for Outlook'

export enum StoreNames {
  mainStore = appName,
  chatStore = 'chat-store'
}

export enum DialogSource {
  auth = 'auth'
}

export const dialogURLs = {
  login: `${APP_URL}/login.html`
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

export enum AppTabs {
  gptSlides = 'gpt-slides',
  aiChat = 'ai-chat'
}

export enum AppLaunchModes {
  dev = 'dev',
  prod = 'prod'
}
