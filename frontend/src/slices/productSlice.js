import {createSlice} from "@reduxjs/toolkit";
import {getProductsByCollectionThunk, getProductsThunk} from "../thunks/productThunks";
import {collections} from "../data/collections";

const initialState = {
    products: {
        'all': [],
        [collections.AE]: [],
        [collections.UR]: [],
        [collections.AG]: [],
    },
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
                state.products = {
                    ...state.products,
                    'all': action.payload,
                }
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(getProductsByCollectionThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductsByCollectionThunk.fulfilled, (state, action) => {
                state.loading = false
                state.products = {
                    ...state.products,
                    [action.payload.collection]: action.payload.data,
                }
            })
            .addCase(getProductsByCollectionThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })
})


export const {  } = productSlice.actions
export default productSlice.reducer
