import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TransactionContextProvider from './context/TransactionContext'
import ErrorBoundary from "./components/error/ErrorBoundary"

import './index.css'
// import TransactionContextProvider from './context/TransactionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
 <TransactionContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionContextProvider>
  </ErrorBoundary>
  ,
)
