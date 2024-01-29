import {createSlice} from "@reduxjs/toolkit";
import {getProductById, getProductsThunk} from "../thunks/productThunks";
import {collections} from "../data/collections";

const initialState = {
    products: {
        'all': [],
        [collections.AE]: [],
        [collections.UR]: [],
        [collections.AG]: [],
    },
    currentProduct: null,
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
                console.log('something')
                console.log([action.payload?.collection ?? 'all'])

                state.products = {
                    ...state.products,
                    [action.payload?.collection ?? 'all']: action.payload?.products,
                }
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(getProductById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false
                state.currentProduct = action.payload
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

})

export const {  } = productSlice.actions
export default productSlice.reducer
