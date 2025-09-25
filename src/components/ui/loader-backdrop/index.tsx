import { Box, Spinner } from '@radix-ui/themes'
import { useEffect } from 'react'

import { useAppStore } from '@/stores/app.store.ts'

const Index = () => {
  const { backdrop, setBackdrop } = useAppStore()

  const handleClick = () => {
    if (backdrop?.closeOnClick) {
      setBackdrop({ open: false, closeOnClick: true })
    }
  }

  useEffect(() => {
    const initialState = { open: false, closeOnClick: true }
    setBackdrop(initialState)
  }, [setBackdrop])

  if (!backdrop?.open) return null

  return (
    <Box
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spinner size="3" />
    </Box>
  )
}

export default Index
