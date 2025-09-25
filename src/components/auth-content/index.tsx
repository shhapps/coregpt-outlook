import { Box } from '@radix-ui/themes'

import classes from './auth-content.module.css'

import Advantages from '@/components/advantages'
import SignInContent from '@/components/sign-in-content'

const Index = () => {
  return (
    <Box className={classes.wrapper}>
      <Advantages />
      <SignInContent />
    </Box>
  )
}

export default Index
