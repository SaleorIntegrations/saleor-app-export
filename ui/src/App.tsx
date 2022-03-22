import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from 'react-router-dom'

import { useCurrentUserQuery } from './common/api/saleor/query'
import { useCurrentUser } from './common/hooks/useCurrentUser'
import { ReportList } from './table'
import { UpdateOrderReport, CreateOrderReport } from './order'
import { UpdateProductReport, CreateProductReport } from './product'
import { useCommon, useOrder, useProduct } from './common'

import './App.css'

function App() {
  const commonStore = useCommon()
  const orderStore = useOrder()
  const productStore = useProduct()
  const [currentUser] = useCurrentUserQuery()
  const location = useLocation()
  const setCurrentUser = useCurrentUser(state => state.setUser)

  useEffect(() => {
    if (currentUser.data) setCurrentUser(currentUser.data.me)
  }, [currentUser, setCurrentUser])

  useEffect(() => {
    if (location.pathname === '/') {
      commonStore.reset()
      orderStore.reset()
      productStore.reset()
    }

    if (matchPath('/report/:id/product', location.pathname)) {
      productStore.reset()
      commonStore.reset()
    }

    if (matchPath('/report/:id/order', location.pathname)) {
      orderStore.reset()
      commonStore.reset()
    }
  }, [location.pathname])

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
