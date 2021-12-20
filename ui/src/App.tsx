import React from 'react'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'

import Layout from './components/Layout'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      {/* <TenantProvider> */}
      <Layout
        header={<Header />}
        content={<div>Content</div>}
        footer={<div>Footer</div>}
      />
      {/* </TenantProvider> */}
    </ThemeProvider>
  )
}

export default App
