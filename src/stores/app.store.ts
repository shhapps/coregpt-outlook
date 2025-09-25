import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { IBackdrop, ISnackbarProps } from '@/interfaces/app.interfaces'
import type { IUserInfo } from '@/interfaces/auth.interfaces'
import { AppTabs, LocalStorageKeys, StoreNames, Theme } from '@/utils/constants'
import { getStoreName } from '@/utils/global'
import { setStoreDefaultValues } from '@/utils/global/store'

export interface IAppState {
  requestId: string
  theme: Theme
  updateTheme: (newTheme: Theme) => void
  backdrop?: IBackdrop
  setBackdrop: (backdrop: IBackdrop) => void
  snackbar?: ISnackbarProps
  setSnackbar: (data: ISnackbarProps) => void
  accessToken?: string
  updateAccessToken: (accessToken?: string) => void
  userInfo?: IUserInfo
  updateUserInfo: (userInfo?: IUserInfo) => void
  appTab: AppTabs
  setAppTab: (newAppTab: AppTabs) => void
}

setStoreDefaultValues()

export const useAppStore = create<IAppState>()(
  devtools(
    set => ({
      requestId: localStorage.getItem(LocalStorageKeys.requestId),
      theme: localStorage.getItem(LocalStorageKeys.theme),
      updateTheme: (newTheme: Theme) => {
        localStorage.setItem(LocalStorageKeys.theme, newTheme)
        set({ theme: newTheme })
      },
      backdrop: { open: false, closeOnClick: true },
      setBackdrop: (backdrop: IBackdrop) => {
        if (backdrop.closeOnClick !== false) set({ backdrop: { open: backdrop.open, closeOnClick: true } })
        else set({ backdrop: { open: backdrop.open, closeOnClick: backdrop.closeOnClick } })
      },
      snackbar: { open: false },
      setSnackbar: snackbar => set({ snackbar }),
      accessToken: localStorage.getItem(LocalStorageKeys.accessToken) as string,
      updateAccessToken: (accessToken?: string) => {
        if (accessToken) {
          localStorage.setItem(LocalStorageKeys.accessToken, accessToken)
          set({ accessToken })
        }
      },
      updateUserInfo: (userInfo?: IUserInfo) => {
        if (userInfo) set({ userInfo })
      },
      appTab: AppTabs.gptSlides,
      setAppTab: (newAppTab: AppTabs) => set({ appTab: newAppTab })
    }),
    { name: getStoreName(StoreNames.mainStore) }
  )
)
