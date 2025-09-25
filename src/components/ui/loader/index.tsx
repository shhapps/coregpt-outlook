import { Box, Button, Spinner } from '@radix-ui/themes'
import { Fragment, useEffect, useRef, useState } from 'react'

import { cssAppColorVarName } from '@/utils/constants.ts'

const Index = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [reloadBtn, setReloadBtn] = useState(false)
  const handleReload = () => window.location.reload()

  useEffect(() => {
    setTimeout(function () {
      if (loaderRef.current) setReloadBtn(true)
    }, 10000)
  }, [])

  return (
    <Fragment>
      <Box
        style={{
          position: 'absolute',
          display: 'grid',
          placeItems: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: `var(${cssAppColorVarName})`
        }}
        ref={loaderRef}
      >
        <Spinner size="3" style={{ width: '40px', height: '40px', color: 'white' }} />
      </Box>
      <Box style={{ position: 'absolute', bottom: '20px', left: '45%', cursor: 'pointer' }}>
        {reloadBtn && (
          <Button
            variant="outline"
            onClick={handleReload}
            style={{
              textTransform: 'none',
              fontWeight: 500,
              cursor: 'pointer',
              color: 'white',
              border: '1px solid white'
            }}
          >
            Reload
          </Button>
        )}
      </Box>
    </Fragment>
  )
}

export default Index
