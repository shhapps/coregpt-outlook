import { useEffect } from 'react'
import { toast } from 'sonner'

import { useAppStore } from '@/stores/app.store.ts'

const MessageSnackbar = () => {
  const { snackbar, setSnackbar } = useAppStore()

  useEffect(() => {
    if (snackbar?.message && snackbar.open) {
      toast[snackbar.severity ?? 'info'](snackbar.message)
      // auto-clear after showing
      setSnackbar({ open: false, message: '' })
    }
  }, [snackbar, setSnackbar])

  return null
}

export default MessageSnackbar
