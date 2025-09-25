import { useState } from 'react'
import { toast } from 'sonner'

import { fallbackCopyTextToClipboard } from '@/utils/global/ui'

const useCopy = (timeout = 3) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = (textToCopy?: string) => {
    if (!textToCopy) return
    const success = fallbackCopyTextToClipboard(textToCopy || '')
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), timeout * 1000)
    } else toast.error('Failed to copy to clipboard. Please copy manually.')
  }

  return { handleCopy, copied }
}

export default useCopy
