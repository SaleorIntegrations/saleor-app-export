import React from 'react'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'

import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      {/* <TenantProvider> */}
      <Layout
        header={<Header />}
        content={<Content settings={<div>a</div>} options={<div>b</div>} />}
        footer={<Footer />}
      />
      {/* </TenantProvider> */}
    </ThemeProvider>
  )
}

export default App
