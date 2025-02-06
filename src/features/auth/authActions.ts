import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCreds, ErrorLoginResponse, SuccessLoginResponse } from '../lib/types';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginCreds, thunkApi) => {

        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        }

        const { data, status } = await axios.post(
            `${process.env.BACKEND_URL}?rest_route=/simple-jwt-login/v1/auth&email=info@everglow.local&password=eDJCUUpNVUBYV2ky&AUTH_KEY=GsSTWxgH@DnM_b|%23qv*zh(}S[3$FkoIOj`,
            { },
            config
        )

        if (status !== 200) {
            return thunkApi.rejectWithValue( data as ErrorLoginResponse  )
        }

        return data as SuccessLoginResponse;

    }
)