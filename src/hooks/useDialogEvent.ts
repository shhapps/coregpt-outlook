import { useAppStore } from '@/stores/app.store'
import { COMMON_MESSAGES, type DialogSource } from '@/utils/constants'

export const useDialogEvent = (dialogSource: DialogSource) => {
  const { setSnackbar } = useAppStore()

  function processDialogEvent(args: Office.DialogParentMessageReceivedEventArgs) {
    if ('error' in args) {
      switch (args.error) {
        case 12002:
          console.error('The dialog was closed by the user')
          break
        case 12003:
          console.error('The dialog box was directed to a URL with the HTTP protocol. HTTPS is required.')
          break
        case 12006:
          console.error('The dialog was closed')
          break
        default:
          setSnackbar({
            message: `An error occurred: ${args.error}`,
            open: true,
            severity: 'error'
          })

          console.error(`An error occurred in ${dialogSource} dialog: ${args.error}`)
      }
    }
  }

  function handleFailedDialogDisplay(result: Office.AsyncResult<Office.Dialog>) {
    switch (result.error.code) {
      case 12004:
        console.error('Domain is not trusted')
        break
      case 12005:
        console.error('HTTPS is required')
        break
      case 12007:
        setSnackbar({ message: COMMON_MESSAGES.dialogAlreadyOpened, open: true, severity: 'info' })
        break
      case 12009:
        setSnackbar({ message: COMMON_MESSAGES.dialogIgnored, open: true, severity: 'error' })
        break
      case 12011:
        setSnackbar({ message: COMMON_MESSAGES.popUpBlocked, open: true, severity: 'error' })
        break
      default:
        setSnackbar({
          message: `An error occurred: ${result.error.code} ${result.error.message}`,
          open: true,
          severity: 'error'
        })
        console.error(`An error occurred in ${dialogSource} dialog: ${result.error.code} ${result.error.message}`)
        break
    }
  }

  return { processDialogEvent, handleFailedDialogDisplay }
}
