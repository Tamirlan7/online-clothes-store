import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    products: [],
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        showCart(state) {
            state.visible = true
        },
        hideCart(state) {
            state.visible = false
        },
        addProductToCart(state, action) {
            if (action.payload['id']) {
                if (state.products.find(p => p.id === action.payload.id)) {
                    return
                }

                state.products.push(action.payload)
            }
        },
        removeProductFromCart(state, action) {
            state.products = state.products.filter(p => p.id !== action.payload)
        },
        changeProductQuantity(state, action) {
            /*
            * action.payload = IProduct
            *  */

            if (action.payload['id']) {
                state.products = state.products.map(p => {
                    if (p.id === action.payload.id) {
                        if (p?.size?.name === action.payload?.size?.name) {
                            p.size.quantity = action.payload.size.quantity
                        }
                    }

                    return p
                })
            }
        }
    },
})

export const {showCart, hideCart, addProductToCart, removeProductFromCart, changeProductQuantity} = collectionSlice.actions
export default collectionSlice.reducer
