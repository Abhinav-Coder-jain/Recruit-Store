import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Redux Imports
import { Provider } from 'react-redux'
import { store } from './common/store.js'

import AuthProvider from './features/auth/AuthProvider.jsx'


import { Toaster } from 'react-hot-toast'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  
<QueryClientProvider client={queryClient}>
      <AuthProvider >
      <App />

      <Toaster position="top-center" />

    </AuthProvider>
    </QueryClientProvider>
    </Provider>   
  </React.StrictMode>,
)   