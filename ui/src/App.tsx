import React from 'react'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'

import './App.css'

function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <h1>Hello World</h1>
      </TenantProvider>
    </ThemeProvider>
  )
}

export default App
