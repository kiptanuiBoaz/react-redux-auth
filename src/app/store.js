import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer:{
        // resolve reducer dynamically
        [apiSlice.reducerPath]: apiSlice.reducerPath,
    },
    middleware: getDefaultMiddleware => 
    //required to enable caching
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, //swith to flase in production
})