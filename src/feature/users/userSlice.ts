import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import { UsersSliceEnum } from '../../utils/enum'

interface InterfaceUsersProp {
  id: number | string
  name: string
}

const USER_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState: Array<InterfaceUsersProp> = [
]

export const fetchUsers = createAsyncThunk('uses/fetchUsers',async () => {
  try {
    const response = await axios.get(USER_URL);
    return [...response.data]
  } catch(error : any) {
    return error.message
  }
})

const usersSlice = createSlice({
  name: UsersSliceEnum.USERS,
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
     .addCase(fetchUsers.fulfilled, (state , action) => {
       return action.payload
     })
  }
})

export const selectAllUsers = (state: RootState) => state.users

export default usersSlice.reducer
