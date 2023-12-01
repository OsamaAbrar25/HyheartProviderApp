// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.234.37.110/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      // const token = getState().userApi.mutations?.signIn?.data?.token;
      // const token = AsyncStorage.getItem('JWT');
      // console.log("Token: ", token)
      // if (token) headers.set('Authorization', 'Bearer ' + token)
      const token = getState().auth.jwt
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getZegoToken: builder.query({ query: () => `zego` }),
    validateFirebaseToken: builder.mutation({ query: (body) => ({ url: `auth/validate-token`, method: 'POST', body }) }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetZegoTokenQuery, useValidateFirebaseTokenMutation } = userApi