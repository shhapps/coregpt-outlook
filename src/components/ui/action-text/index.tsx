import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Box, Text, Tooltip } from '@radix-ui/themes'
import type { FC } from 'react'

import classes from './action-text.module.css'

interface IActionTextProps {
  primaryText: string
  tooltipText: string
  bold?: boolean
}

const Index: FC<IActionTextProps> = ({ tooltipText, primaryText, bold }) => {
  return (
    <Box className={classes.askAiBox}>
      <Text size="1" weight={bold ? 'bold' : 'medium'}>
        {primaryText} &nbsp;
      </Text>
      <Tooltip
        delayDuration={300}
        content={
          <Box className={classes.tooltipHover} as="span">
            <Text size="1">{tooltipText}</Text>
          </Box>
        }
      >
        <QuestionMarkCircledIcon width="13px" height="13px" />
      </Tooltip>
    </Box>
  )
}

export default Index
