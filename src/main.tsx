import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import ThemeProvider from '@mui/material/styles/ThemeProvider'

import App from './App'
import { store } from './app/store'

import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
