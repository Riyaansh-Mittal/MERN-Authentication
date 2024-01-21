import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';


export const store = configureStore({
    reducer:{
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        //to prevent some errors while we are using redux toolkit
    }),
})