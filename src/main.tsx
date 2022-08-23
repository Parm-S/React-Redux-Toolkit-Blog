import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import ThemeProvider from '@mui/material/styles/ThemeProvider'

import { store } from './app/store'

import theme from './theme'

import { fetchUsers } from './feature/users/userSlice'

import App from './App'
import CssBaseline from '@mui/material/CssBaseline'

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
