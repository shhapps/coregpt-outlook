import { Avatar, Box, Card, IconButton, Tooltip } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'

import classes from './header.module.css'

import { useAppStore } from '@/stores/app.store.ts'
import { Theme } from '@/utils/constants'
import { LogoImage } from '@/utils/global/files'

const Header = () => {
  const { theme, updateTheme } = useAppStore()

  const handleThemeClick = () => {
    if (theme === Theme.dark) updateTheme(Theme.light)
    if (theme === Theme.light) updateTheme(Theme.dark)
  }

  return (
    <Card className={classes.header} asChild>
      <header>
        <IconButton radius="full" size="1" variant="outline">
          <Avatar
            variant="soft"
            radius="full"
            size="1"
            fallback={<img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={LogoImage} alt="logo" />}
          />
        </IconButton>
        <Box className={classes.leftItems}>
          <Tooltip content="Toggle theme">
            <IconButton ml="3" onClick={handleThemeClick} variant="outline" size="1">
              {theme === Theme.dark ? <Sun width="15" height="15" /> : <Moon width="15" height="15" />}
            </IconButton>
          </Tooltip>
        </Box>
      </header>
    </Card>
  )
}

export default Header
