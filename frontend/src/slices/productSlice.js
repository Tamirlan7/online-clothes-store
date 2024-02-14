import {createSlice} from "@reduxjs/toolkit";
import {
    createProductThunk,
    deleteProductThunk,
    getProductByIdThunk,
    getProductsThunk,
    updateProductsThunk
} from "../thunks/productThunks";
import {ADMIN_PRODUCTS_PAGE} from "../constants/AppConstants";

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    postLoading: false,
    error: false,
    errorMessage: null,
    putLoading: false,
    totalPages: null,
    deleteLoading: false,
    showConfirmAction: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeShowConfirmAction(state, action) {
            if (typeof action.payload === 'boolean') {
                state.showConfirmAction = action.payload
            }
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getProductsThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false
                if (Array.isArray(action.payload?.content)) {
                    state.collections = action.payload
                    state.products = action.payload.content
                }
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

            .addCase(updateProductsThunk.pending, (state, action) => {
                state.putLoading = true
            })
            .addCase(updateProductsThunk.fulfilled, (state, action) => {
                state.putLoading = false
                if (Array.isArray(action.payload)) {
                    for (let tp of action.payload) {
                        state.products = state.products.map(p => {
                            if (p.id === tp.id) {
                                return tp
                            }

                            return p
                        })
                    }
                }
            })
            .addCase(updateProductsThunk.rejected, (state, action) => {
                state.putLoading = false
                state.error = true
                state.errorMessage = action.payload
            })

})

export const {changeShowConfirmAction} = productSlice.actions
export default productSlice.reducer
