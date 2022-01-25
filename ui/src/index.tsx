import React from 'react'
import ReactDOM from 'react-dom'
import { TenantProvider } from 'saleor-app-ui'
import { ThemeProvider } from '@saleor/macaw-ui'
import { Provider as QLClientProvider } from 'urql'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { apiClient } from './api'
import { Router } from './Router'

ReactDOM.render(
  <React.StrictMode>
    <QLClientProvider value={apiClient}>
      <ThemeProvider>
        <TenantProvider>
          <Router>
            <App />
          </Router>
        </TenantProvider>
      </ThemeProvider>
    </QLClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
