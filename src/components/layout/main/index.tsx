import { Box } from '@radix-ui/themes'
import { useEffect } from 'react'

import classes from './main.module.css'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import AppTabs from '@/components/tabs/app-tabs'
import Loader from '@/components/ui/loader'
import { useAuthData } from '@/hooks/useAuthData.ts'
import { useAppStore } from '@/stores/app.store.ts'

const Index = () => {
  const { accessToken } = useAppStore()
  const { checkAuthState } = useAuthData()

  useEffect(() => {
    void checkAuthState()
  }, [checkAuthState, accessToken])

  if (!accessToken) return <Loader />

  return (
    <Box className={classes.wrapper}>
      <Box asChild>
        <Header />
      </Box>
      <Box asChild>
        <main className={classes.main}>
          <AppTabs />
        </main>
      </Box>
      <Box asChild>
        <Footer />
      </Box>
    </Box>
  )
}

export default Index
