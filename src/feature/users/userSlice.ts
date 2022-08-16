import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { UsersSliceEnum } from '../../utils/enum'

interface InterfaceUsersProp {
  id: number | string
  name: string
}
const initialState: Array<InterfaceUsersProp> = [
  { id: 1, name: 'Parminder Singh' },
  { id: 2, name: 'Atul Sharma' },
]

const usersSlice = createSlice({
  name: UsersSliceEnum.USERS,
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users

export default usersSlice.reducer
