import React from 'react'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'

import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import './App.css'

// to remove
import ReportList from './pages/ReportList'
import ReportType from './components/ReportType'
import ExportPicker from './components/ExportPicker'
import ActionsContainer from './components/ActionsContainer'

const options = (
  <>
    <ReportType isMutable reportType="Products" />
    <ExportPicker />
    <ActionsContainer />
  </>
)

function App() {
  return (
    <ThemeProvider>
      {/* <TenantProvider> */}
      {/* <Layout
        header={<Header />}
        content={<Content settings={<div>a</div>} options={options} />}
        footer={<Footer />}
      /> */}
      <Layout header={<ReportList />} content={<div />} footer={<div />} />
      {/* </TenantProvider> */}
    </ThemeProvider>
  )
}

export default App
