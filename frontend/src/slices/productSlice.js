import {createSlice} from "@reduxjs/toolkit";
import {createProductThunk, deleteProductThunk, getProductByIdThunk, getProductsThunk} from "../thunks/productThunks";

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    postLoading: false,
    error: false,
    errorMessage: null,
    totalPages: null,
    deleteLoading: false,
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
                state.postLoading = true
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.postLoading = false
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.postLoading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(deleteProductThunk.pending, (state, action) => {
                state.deleteLoading = true
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.deleteLoading = false
                state.products = state.products.filter(p => p.id !== action.payload)
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.deleteLoading = false
                state.error = true
                state.errorMessage = action.payload
            })


})

export const {  } = productSlice.actions
export default productSlice.reducer
