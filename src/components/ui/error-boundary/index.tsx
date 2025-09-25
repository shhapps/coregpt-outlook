import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes'
import { Component, type ErrorInfo, type PropsWithChildren } from 'react'

import classes from './error-boundary.module.css'

const ErrorAlert = () => {
  const handleClick = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Box className={classes.wrapper}>
      <Flex direction="column" align="center" justify="center" className={classes.flexContainer}>
        <Box className={classes.card}>
          <Heading align="center" as="h1" size="5" mb="3" color="red">
            Something went wrong
          </Heading>
          <Text size="2" mb="4" color="gray" align="center" as="p">
            An unexpected error occurred. Please try to reload.
          </Text>
          <Box className={classes.btnWrapper}>
            <Button className={classes.btn} variant="outline" size="2" onClick={handleClick}>
              Reload
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren<object>, IErrorBoundaryState> {
  constructor(props: PropsWithChildren<object>) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    return hasError ? <ErrorAlert /> : this.props.children
  }
}

export default ErrorBoundary
