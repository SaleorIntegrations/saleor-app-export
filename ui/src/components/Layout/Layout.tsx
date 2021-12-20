import React from 'react'
import { Box, Container } from '@material-ui/core'

interface LayoutProps {
  header: React.ReactNode,
  content: React.ReactNode,
  footer: React.ReactNode,
}

export function Layout(props: LayoutProps) {
  const { header, content, footer } = props

  return (
    <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>{header}</Box>
      <Box style={{ flex: '1 1 auto', margin: '1em 0' }}>{content}</Box>
      <Box>{footer}</Box>
    </Container>
  )
}

export default Layout
