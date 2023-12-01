import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    jwt: null,
    // email: null,
    // id: null,
    // name: null,
    isLoggedIn: false,
    userData: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      storeUserData(state, action) {
        state.userData = action.payload;
        state.isLoggedIn = true;
      },
      removeUserData(state, action) {
        state.userData = {};
        state.isLoggedIn = false;
      },
      storeJwt(state, action) {
        state.jwt = action.payload;
      },
      removeJwt(state, action) {
        state.jwt = null;
      },
    },
  })
  
  // Extract the action creators object and the reducer
  const { actions, reducer } = authSlice
  // Extract and export each action creator by name
  export const { storeUserData, removeUserData, storeJwt, removeJwt } = actions
  // Export the reducer, either as a default or named export
  export default reducer