import { captureException, init, replayIntegration } from '@sentry/react'

import { APP_LAUNCH_MODE, AppLaunchModes, SENTRY_DSN } from '@/utils/constants.ts'

export function initSentry() {
  const isProdModeLaunch = APP_LAUNCH_MODE !== AppLaunchModes.dev
  if (isProdModeLaunch) {
    init({
      enabled: isProdModeLaunch,
      dsn: SENTRY_DSN,
      // Setting this option to true will send default PII data to Sentry.
      // For example, automatic IP address collection on events
      sendDefaultPii: true,
      integrations: [
        replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
          maskAllInputs: false
        })
      ],
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
  }
}

export function sendErrorToSentry(exception: unknown) {
  if (!exception) return
  captureException(exception)
}
