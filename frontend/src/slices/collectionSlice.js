import {createSlice} from "@reduxjs/toolkit";
import {addCollectionThunk, getAllCollectionsThunk} from "../thunks/collectionThunks";

const initialState = {
    collections: [],
    loading: false,
    error: false,
    errorMessage: null
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAllCollectionsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCollectionsThunk.fulfilled, (state, action) => {
                state.loading = false
                if (Array.isArray(action.payload)) {
                    state.collections = action.payload
                }
            })
            .addCase(getAllCollectionsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(addCollectionThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(addCollectionThunk.fulfilled, (state, action) => {
                state.loading = false

                if (action.payload['name']) {
                    state.collections.push(action.payload)
                }
            })
            .addCase(addCollectionThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })
})

export const {} = collectionSlice.actions
export default collectionSlice.reducer
