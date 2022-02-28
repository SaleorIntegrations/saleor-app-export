import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useCurrentUserQuery } from './common/api/saleor/query'
import { useCurrentUserStore } from './common/hooks/useCurrentUserStore'
import { ReportList } from './table'
import { UpdateOrderReport, CreateOrderReport } from './order'
import { UpdateProductReport, CreateProductReport } from './product'

import './App.css'

function App() {
  const [currentUser] = useCurrentUserQuery()
  const setCurrentUser = useCurrentUserStore(state => state.setUser)

  useEffect(() => {
    if (currentUser.data) setCurrentUser(currentUser.data.me)
  }, [currentUser, setCurrentUser])

  if (currentUser.fetching) return <div>Loading...</div>

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
