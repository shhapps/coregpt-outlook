import { StoreNames } from '../constants'

export const generateRequestId = () =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  )

export const getValidEmail = (msUserMail: string, userPrincipalName: string) => {
  if (String(msUserMail).includes('@')) return msUserMail
  return userPrincipalName
}

export const getStoreName = (storeName: StoreNames) => {
  return `${storeName} ${process.env.NODE_ENV === 'development' ? 'Local' : ''}`
}

export const debounce = (func: () => void, timeout = 200) => {
  let timeoutId: number | NodeJS.Timeout
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(func, timeout)
  }
}

export const reloadWithClearing = () => {
  localStorage.clear()
  window.location.reload()
}
