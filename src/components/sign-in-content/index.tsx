import { Box, Text } from '@radix-ui/themes'

import MsLoginBtn from '@/components/ui/ms-login-btn'

const Index = () => {
  return (
    <Box style={{ display: 'grid', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: '10px'
        }}
      >
        <Box>
          <Text
            as="p"
            size="1"
            weight="medium"
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              fontSize: '14px',
              marginTop: '15px'
            }}
          >
            Use your Microsoft account <br /> to continue using add-in:
          </Text>
        </Box>
      </Box>
      <MsLoginBtn />
    </Box>
  )
}

export default Index
