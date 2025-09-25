import { Box, Text, Heading } from '@radix-ui/themes'

import Advantage from '@/components/ui/advantage'

const advantages: string[] = [
  'Analyze your data and get feedbacks',
  'Ask anything you want from AI',
  'Translate your content',
  'Fix and update your text using AI'
]

const Index = () => {
  return (
    <Box style={{ padding: '10px 0' }}>
      <Heading
        as="h5"
        size="3"
        style={{
          fontSize: '20px',
          fontWeight: 550,
          textAlign: 'center'
        }}
      >
        Boost your productivity with <br /> AI
      </Heading>
      <Text
        as="p"
        size="2"
        weight="medium"
        style={{
          fontSize: '14px',
          textAlign: 'center',
          padding: '5px 0',
          margin: '20px 0'
        }}
      >
        TRY AI ADVANTAGES FREE:
      </Text>
      {advantages.map(advantage => (
        <Advantage key={advantage} title={advantage} />
      ))}
    </Box>
  )
}

export default Index
