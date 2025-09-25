import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Link } from '@radix-ui/themes'

import classes from './footer.module.css'

import { ExternalLinks } from '@/utils/constants.ts'

const Index = () => {
  return (
    <Callout.Root size="1" asChild>
      <footer className={classes.needHelpContainer}>
        <Callout.Icon>
          <InfoCircledIcon /> &nbsp;
        </Callout.Icon>
        <Callout.Text size="2" align="center">
          Need help? Contact{' '}
          <Link target="_blank" href={ExternalLinks.contactUs}>
            support
          </Link>{' '}
          team
        </Callout.Text>
      </footer>
    </Callout.Root>
  )
}

export default Index
