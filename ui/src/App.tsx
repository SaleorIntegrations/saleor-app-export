import React from 'react'
import { Provider as QLClientProvider } from 'urql'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Routes, Route } from 'react-router-dom'

import ExportSetting from './pages/ExportSetting'
import ReportList from './pages/ReportList'

import apiClient from './api/apiClient'
import './App.css'

function App() {
  return (
    <QLClientProvider value={apiClient}>
      <ThemeProvider>
        {/* <TenantProvider> */}
        <Routes>
          <Route path="/" element={<ReportList />} />
          <Route path="/export" element={<ExportSetting />} />
        </Routes>
        {/* </TenantProvider> */}
      </ThemeProvider>
    </QLClientProvider>
  )
}

export default App
