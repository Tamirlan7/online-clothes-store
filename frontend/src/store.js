import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import collectionSlice from "./slices/collectionSlice";
import appSlice from "./slices/appSlice";

export const store = configureStore({
    reducer: {
        'product': productSlice,
        'collection': collectionSlice,
        'app': appSlice,
    },
    devTools: process.env.NODE_ENV === 'development'
})
