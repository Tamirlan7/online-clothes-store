import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import collectionSlice from "./slices/collectionSlice";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";
import notificationSlice from "./slices/notificationSlice";
import clothingTypeSlice from "./slices/clothingTypeSlice";

export const store = configureStore({
    reducer: {
        'product': productSlice,
        'collection': collectionSlice,
        'app': appSlice,
        'user': userSlice,
        'notification': notificationSlice,
        'clothingType': clothingTypeSlice
    },
    devTools: process.env.NODE_ENV === 'development'
})
