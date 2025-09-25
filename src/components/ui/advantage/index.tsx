import { Box, Text } from '@radix-ui/themes'
import { Check } from 'lucide-react'
import type { FC } from 'react'

interface IAdvantageProps {
  title: string
}

const Index: FC<IAdvantageProps> = ({ title }) => {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '95%',
        margin: '15px auto',
        gap: '10px',
        marginLeft: '20px'
      }}
    >
      <Check size={16} color="#2E7D32" />
      <Text as="p" title={title} size="2" style={{ whiteSpace: 'nowrap' }}>
        {title}
      </Text>
    </Box>
  )
}

export default Index
