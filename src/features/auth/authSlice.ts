import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../lib/types';
import { loginUser } from './authActions';

const initialState: AuthState = {
	loading: false,
	userInfo: {},
	userToken: null,
	error: null,
	success: false,
}
  
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: ( builder ) => {

		builder.addCase( loginUser.pending, (state) => {

			state.loading = true
      		state.error = null
		
		})

		builder.addCase( loginUser.fulfilled, (state, {payload}) => {

			state.loading = false
      		state.success = true
		
		})

		builder.addCase( loginUser.rejected, (state, {payload}) => {

			state.loading = false
			state.error = true

			console.log( payload );
		
		})

	},
})
  
export default authSlice.reducer