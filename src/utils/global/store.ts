import { LocalStorageKeys, Theme } from '../constants'

import { generateRequestId } from './index'

export const defaultAppState = {
  requestId: generateRequestId(),
  theme: Theme.light
}

// Set all default values if not set in localStorage
export const setStoreDefaultValues = () => {
  if (!localStorage.getItem(LocalStorageKeys.requestId))
    localStorage.setItem(LocalStorageKeys.requestId, defaultAppState.requestId)
  if (!localStorage.getItem(LocalStorageKeys.theme)) localStorage.setItem(LocalStorageKeys.theme, defaultAppState.theme)
}
