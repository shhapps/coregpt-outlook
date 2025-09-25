import type { FC } from 'react'
import { createRoot } from 'react-dom/client'

import TaskpaneApp from '@/components/taskpane-app/index.tsx'
import type { IOfficeInitialized } from '@/interfaces/app.interfaces.ts'
import '@/styles/global.css'
import { initSentry } from '@/utils/sentry.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global document, Office, module, require */

let isOfficeInitialized = false

initSentry()

const render = (Component: FC<IOfficeInitialized>) => {
  const mainContainerId = 'app'
  // Clear the existing HTML content
  document.body.innerHTML = `<div id="${mainContainerId}"></div>`
  const root = createRoot(document.getElementById(mainContainerId) as HTMLElement)
  root.render(<Component isOfficeInitialized={isOfficeInitialized} />)
}

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true
  render(TaskpaneApp)
}).catch(console.error)

// For showing loader if office is not initialized
render(TaskpaneApp)
