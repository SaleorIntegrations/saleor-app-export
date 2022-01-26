import React from 'react'
import ReactDOM from 'react-dom'

import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Provider as QLClientProvider } from 'urql'

import './index.css'
import App from './App'
import apiClient from './api/apiClient'
import reportWebVitals from './reportWebVitals'
import { Router } from './Router'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <TenantProvider>
        <QLClientProvider value={apiClient}>
          <Router>
            <App />
          </Router>
        </QLClientProvider>
      </TenantProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
