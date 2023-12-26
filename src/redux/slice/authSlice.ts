import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import LocalStorageService from '../../services/localstorage.service';

export interface IAuthState {
  token?: string | null;
}

const initialState: IAuthState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setloginData: (state, action: PayloadAction<IAuthState | null>) => {
      state.token = action.payload?.token
      localStorage.setItem('access_token', state.token || '')
    },
    logout: (state) => {
      state.token = null
      LocalStorageService.clearStorage();
    },
  },
})

// Action creators are generated for each case reducer function
export const { setloginData, logout } = authSlice.actions

export default authSlice.reducer
