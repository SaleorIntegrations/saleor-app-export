import React from 'react'
import { Provider as QLClientProvider } from 'urql'
// import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Routes, Route } from 'react-router-dom'

import { CreateOrderReport, CreateProductReport } from './pages/CreateReport'
import { ReportList } from './pages/ReportList'
import { UpdateOrderReport, UpdateProductReport } from './pages/UpdateReport'

import apiClient from './api/apiClient'
import './App.css'

function App() {
  return (
    <QLClientProvider value={apiClient}>
      <ThemeProvider>
        {/* <TenantProvider> */}
        <Routes>
          <Route path="/" element={<ReportList />} />
          <Route path="/report/:id">
            <Route path="order" element={<UpdateOrderReport />} />
            <Route path="product" element={<UpdateProductReport />} />
          </Route>
          <Route path="/create">
            <Route path="order" element={<CreateOrderReport />} />
            <Route path="product" element={<CreateProductReport />} />
          </Route>
        </Routes>
        {/* </TenantProvider> */}
      </ThemeProvider>
    </QLClientProvider>
  )
}

export default App
