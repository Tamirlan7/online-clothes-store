import {createSlice} from "@reduxjs/toolkit";
import {getProductsThunk} from "../thunks/productThunks";

const initialState = {
    products: [],
    loading: false,
    error: false,
    errorMessage: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getProductsThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })
})


export const {  } = productSlice.actions
export default productSlice.reducer
