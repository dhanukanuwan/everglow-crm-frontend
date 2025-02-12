import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BrevoSuccessResponse, BrevoErrorResponse } from '../lib/types';

export const getContactsLists = createAsyncThunk(
    'contacts/getlists',
    async ({ limit, offset }: {limit: number, offset: number}, thunkApi) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'api-key': `${process.env.REACT_APP_BREVO_KEY}`
            },
        }

        const { data, status } = await axios.get(
            `https://api.brevo.com/v3/contacts/lists/?limit=${limit}&offset=${offset}`,
            config
        )

        if (status !== 200) {
            return thunkApi.rejectWithValue( data as BrevoErrorResponse  )
        }

        return data as BrevoSuccessResponse;

    }
)