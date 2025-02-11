import { createSlice } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from '../lib/types';
import { loginUser } from './authActions';
import { jwtDecode } from "jwt-decode";

const savedUserToken = localStorage.getItem( 'userToken' );
let tokenActive = false;

if ( savedUserToken ) {
	const decodedToken: UserInfo = jwtDecode( savedUserToken );

	const timeNow = Math.floor(Date.now() / 1000);

    if ( decodedToken.exp && decodedToken.exp > timeNow ) {
		tokenActive = true;
	}
}

const userToken = savedUserToken ? savedUserToken : null;

const initialState: AuthState = {
	loading: false,
	userInfo: {},
	userToken: userToken,
	error: null,
	success: false,
	tokenActive: tokenActive
}
  
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			
			localStorage.removeItem( 'userToken' );
			state.loading = false;
			state.userInfo = {};
			state.userToken = null;
			state.error = null;
			state.tokenActive = false;

		},
		setCredentials: (state, { payload }) => {
			state.userInfo = payload;
		},
		setRefreshToken: (state, { payload }) => {

			state.loading = false;
			
			if ( payload.success ) {
				state.userToken = payload.data.jwt;
				localStorage.setItem( 'userToken', payload.data.jwt );
				state.error = null;
				state.tokenActive = true;
			} else {

				localStorage.removeItem( 'userToken' );
				
				state.userInfo = {};
				state.userToken = null;
				state.error = null;
				state.tokenActive = false;

			}

		},
	},
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
			state.tokenActive = true;

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

export const { logout, setCredentials, setRefreshToken } = authSlice.actions;
export default authSlice.reducer