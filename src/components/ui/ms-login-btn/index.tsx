import { Button } from '@radix-ui/themes'

import classes from './ms-login-btn.module.css'

import MicrosoftIcon from '@/components/ui/icons/MicrosoftIcon.tsx'
import { useAuthDialog } from '@/hooks/useAuthDialog.ts'

const Index = () => {
  const { openLoginDialog } = useAuthDialog()

  return (
    <Button variant="solid" onClick={openLoginDialog} className={classes.selector}>
      <MicrosoftIcon /> Sign in with Microsoft
    </Button>
  )
}

export default Index
