import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import ThemeProvider from '@mui/material/styles/ThemeProvider'

import App from './App'
import { store } from './app/store'

import theme from './theme'
import { fetchUsers } from './feature/users/userSlice'

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
