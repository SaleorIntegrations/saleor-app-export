import React from 'react'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'

import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import './App.css'

// to remove
import ReportType from './components/ReportType'
import ExportPicker from './components/ExportPicker'

const options = (
  <>
    <ReportType isMutable reportType="Products" />
    <ExportPicker />
  </>
)

function App() {
  return (
    <ThemeProvider>
      {/* <TenantProvider> */}
      <Layout
        header={<Header />}
        content={
          <Content
            settings={<div>a</div>}
            options={options}
          />
        }
        footer={<Footer />}
      />
      {/* </TenantProvider> */}
    </ThemeProvider>
  )
}

export default App
