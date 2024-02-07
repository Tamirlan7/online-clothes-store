import {createSlice} from "@reduxjs/toolkit";
import {createProductThunk, getProductByIdThunk, getProductsThunk} from "../thunks/productThunks";

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: false,
    errorMessage: null,
    totalPages: null,
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
                state.products = action.payload?.content
                state.totalPages = action.payload?.totalPages
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(getProductByIdThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductByIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.currentProduct = action.payload
            })
            .addCase(getProductByIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(createProductThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

})

export const {  } = productSlice.actions
export default productSlice.reducer
