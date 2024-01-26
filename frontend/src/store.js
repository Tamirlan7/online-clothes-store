import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import collectionSlice from "./slices/collectionSlice";

export const store = configureStore({
    reducer: {
        'product': productSlice,
        'collection': collectionSlice
    },
    devTools: process.env.NODE_ENV === 'development'
})
