import React from 'react'
import { Provider as QLClientProvider } from 'urql'
// import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Routes, Route } from 'react-router-dom'

import Export from './pages/Export'
import RaportList from './pages/RaportList'

import apiClient from './api/apiClient'
import './App.css'

function App() {
  return (
    <QLClientProvider value={apiClient}>
      <ThemeProvider>
        {/* <TenantProvider> */}
        <Routes>
          <Route path="/" element={<RaportList />} />
          <Route path="/export" element={<Export />} />
        </Routes>
        {/* </TenantProvider> */}
      </ThemeProvider>
    </QLClientProvider>
  )
}

export default App
