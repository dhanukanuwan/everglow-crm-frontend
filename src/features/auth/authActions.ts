import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCreds, ErrorLoginResponse, SuccessLoginResponse } from '../lib/types';
import { encode } from 'js-base64';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginCreds, thunkApi) => {

        const base64Password = encode( password );

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data, status } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}wp-json/simple-jwt-login/v1/auth/?email=${email}&password=${base64Password}`,
            { },
            config
        )

        if (status !== 200) {
            return thunkApi.rejectWithValue( data as ErrorLoginResponse  )
        }

        localStorage.setItem( 'userToken', data.data.jwt );

        return data as SuccessLoginResponse;

    }
)