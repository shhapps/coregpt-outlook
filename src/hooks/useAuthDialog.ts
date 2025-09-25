import { useDialogEvent } from '@/hooks/useDialogEvent.ts'
import type { OfficeEventHandler } from '@/interfaces/app.interfaces.ts'
import type { IMSAuthErrorResult, IMSAuthResult } from '@/interfaces/auth.interfaces.ts'
import { AuthStatus } from '@/interfaces/auth.interfaces.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { COMMON_MESSAGES, DialogSource, dialogURLs } from '@/utils/constants.ts'

export const useAuthDialog = () => {
  const { setBackdrop, setSnackbar } = useAppStore()
  const { handleFailedDialogDisplay, processDialogEvent } = useDialogEvent(DialogSource.auth)

  const processAuthDialogEvent = (args: Office.DialogParentMessageReceivedEventArgs) => {
    setBackdrop({ open: false })
    processDialogEvent(args)
  }

  const openLoginDialog = () => {
    let loginDialog: Office.Dialog

    if (!Office?.context.ui)
      return setSnackbar({
        message: COMMON_MESSAGES.officeIsNotFullyLoaded,
        open: true,
        severity: 'error'
      })

    setBackdrop({ open: true, closeOnClick: false })

    Office.context.ui.displayDialogAsync(dialogURLs.login, { height: 40, width: 30 }, result => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        handleFailedDialogDisplay(result)
        setBackdrop({ open: false })
      } else {
        loginDialog = result.value
        loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, processLoginMessage as OfficeEventHandler)
        loginDialog.addEventHandler(Office.EventType.DialogEventReceived, processAuthDialogEvent as OfficeEventHandler)
      }
    })

    const processLoginMessage = async (arg: { message: string; origin: string }) => {
      const messageFromDialog = JSON.parse(arg.message) as {
        status: AuthStatus
        result: IMSAuthResult | IMSAuthErrorResult
      }
      if (messageFromDialog.status !== AuthStatus.success) {
        const authErrorResult = messageFromDialog.result as IMSAuthErrorResult
        console.error(authErrorResult)
        // Something went wrong with authentication or the authorization of the web application.
        loginDialog.close()
        console.error('Error while signing in user with Microsoft: ', authErrorResult)
        setBackdrop({ open: false })
        setSnackbar({
          open: true,
          message: authErrorResult.errorMessage || COMMON_MESSAGES.somethingWentWrong,
          severity: 'error'
        })
      } else {
        // We now have a valid access token.
        const authResult = messageFromDialog.result as IMSAuthResult
        console.error('authResult => ', authResult)
        setBackdrop({ open: false, closeOnClick: true })
        loginDialog.close()
      }
    }
  }

  const logoutUser = () => {
    try {
      localStorage.clear()
      setTimeout(() => window.location.reload(), 200)
    } catch (e) {
      console.error('Error while logging out user with Microsoft: ', e)
      setSnackbar({ open: true, message: 'Error while sign out!', severity: 'error' })
    }
  }

  return { openLoginDialog, logoutUser }
}
