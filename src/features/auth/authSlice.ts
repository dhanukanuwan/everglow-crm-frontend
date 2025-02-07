import { createSlice } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from '../lib/types';
import { loginUser } from './authActions';
import { jwtDecode } from "jwt-decode";

const savedUserToken = localStorage.getItem( 'userToken' );
const userToken = savedUserToken ? savedUserToken : null;

const initialState: AuthState = {
	loading: false,
	userInfo: {},
	userToken: userToken,
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
      		state.success = payload.success;
			state.userToken = payload.data.jwt;
			state.error = !payload.success;

			const decoded: UserInfo = jwtDecode( payload.data.jwt );

			if ( decoded ) {
				state.userInfo = decoded;
			}
		
		})

		builder.addCase( loginUser.rejected, (state, {payload}) => {

			state.loading = false
			state.error = true
		
		})

	},
})
  
export default authSlice.reducer