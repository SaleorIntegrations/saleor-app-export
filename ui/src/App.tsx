import React from 'react'
import { Provider as QLClientProvider } from 'urql'
// import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Routes, Route } from 'react-router-dom'

import { CreateReport, Report } from './pages/Export'
import { ReportList } from './pages/ReportList'

import apiClient from './api/apiClient'
import './App.css'

function App() {
  return (
    <QLClientProvider value={apiClient}>
      <ThemeProvider>
        {/* <TenantProvider> */}
        <Routes>
          <Route path="/" element={<ReportList />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/report/:id" element={<Report />} />
        </Routes>
        {/* </TenantProvider> */}
      </ThemeProvider>
    </QLClientProvider>
  )
}

export default App
