import { createSlice } from '@reduxjs/toolkit';
import { ContactsState } from '../lib/types';
import { getContactsLists, getListContacts } from './contactsActions';
import { encode } from 'js-base64';


const initialState: ContactsState = {
	loading: false,
	contactsLists: {},
	listContacts: [],
	error: null,
	listContactsError: null,
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

		builder.addCase( getContactsLists.rejected, (state) => {

			state.loading = false
			state.error = true
		
		})

		builder.addCase( getListContacts.pending, (state) => {

			state.loading = true
      		state.listContactsError = null
		
		})

		builder.addCase( getListContacts.fulfilled, (state, action) => {

			state.loading = false
      		state.success = true

			//console.log( action );

			// Generate a uique key to identify cached data
			const base64key = encode( `${action.meta.arg.listID}-${action.meta.arg.offset}-${action.meta.arg.limit}` );
			const newContactsObject = {id: action.meta.arg.listID, contacts: action.payload.contacts, count: action.payload.count, key: base64key};

			// If there are no list contacts available, just add the new item to the array.
			if ( ! state.listContacts || ( state.listContacts && state.listContacts.length === 0 ) ) {
				
				state.listContacts = [
					newContactsObject
				]

			} else {

				// Find the array key of existing cached list contacts.
				const contactsCachedKey = state.listContacts.findIndex( (item) => item.key === base64key );

				// Add new item to the array if the key is not found in cached state.
				if ( contactsCachedKey === -1 ) {
					state.listContacts.push( newContactsObject );
				} else {

					// Update cached item with new fetched data.
					state.listContacts[ contactsCachedKey ] = newContactsObject;

				}

			}
		
		})

		builder.addCase( getListContacts.rejected, (state) => {

			state.loading = false
			state.listContactsError = true
		
		})

	},
})

//export const { logout, setCredentials, setRefreshToken } = authSlice.actions;
export default contactsSlice.reducer