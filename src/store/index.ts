import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './slices/authSlice'
import { userApi } from '../apis/user'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //   blacklist: ['Books'],
};

const rootReducer = combineReducers({
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
