import { Box, Heading, Tabs } from '@radix-ui/themes'

import classes from './app-tabs.module.css'

import Chat from '@/components/tabs/chat'
import GptSlides from '@/components/tabs/gpt-slides'
import { useAppStore } from '@/stores/app.store.ts'
import { AppTabs } from '@/utils/constants.ts'

const Index = () => {
  const { appTab, setAppTab } = useAppStore()

  const handleTabChange = (newAppTab: AppTabs | string) => setAppTab(newAppTab as AppTabs)

  return (
    <Tabs.Root defaultValue={appTab} onValueChange={handleTabChange}>
      <Tabs.List className={classes.tabsTriggers} size="1">
        <Tabs.Trigger className={classes.triggerItem} value={AppTabs.gptSlides}>
          GPT Slides
        </Tabs.Trigger>
        <Tabs.Trigger className={classes.triggerItem} value={AppTabs.aiChat}>
          AI Chat
        </Tabs.Trigger>
      </Tabs.List>

      <Box pt="1">
        <Tabs.Content value={AppTabs.gptSlides}>
          <Heading size="1" mt="3">
            Create Presentation using GPT
          </Heading>
          <GptSlides />
        </Tabs.Content>

        <Tabs.Content value={AppTabs.aiChat}>
          <Chat />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}

export default Index
