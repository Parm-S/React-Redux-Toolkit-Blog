import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../feature/post/postSlice'
import usersReducer from '../feature/users/userSlice'

const store = configureStore({
  reducer: {
    posts : postReducer,
    users : usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export { store }
