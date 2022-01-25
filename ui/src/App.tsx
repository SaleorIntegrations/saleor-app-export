import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { UpdateOrderReport, UpdateProductReport } from './pages/UpdateReport'
import { CreateOrderReport, CreateProductReport } from './pages/CreateReport'
import { ReportList } from './pages/ReportList'

import './App.css'

function App() {
  return (
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
  )
}

export default App
