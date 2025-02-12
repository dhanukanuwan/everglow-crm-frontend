import { createSlice } from '@reduxjs/toolkit';
import { ContactsState } from '../lib/types';
import { getContactsLists } from './contactsActions';


const initialState: ContactsState = {
	loading: false,
	contactsLists: {},
	error: null,
	success: false,
}
  
const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		logout: (state) => {
			
			state.loading = false;
			state.error = null;

		},
	},
	extraReducers: ( builder ) => {

		builder.addCase( getContactsLists.pending, (state) => {

			state.loading = true
      		state.error = null
		
		})

		builder.addCase( getContactsLists.fulfilled, (state, {payload}) => {

			state.loading = false
      		state.success = true
			state.contactsLists = payload
		
		})

		builder.addCase( getContactsLists.rejected, (state, {payload}) => {

			state.loading = false
			state.error = true
		
		})

	},
})

//export const { logout, setCredentials, setRefreshToken } = authSlice.actions;
export default contactsSlice.reducer