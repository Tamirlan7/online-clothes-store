import {createSlice} from "@reduxjs/toolkit";
import {getAllCollectionsThunk} from "../thunks/collectionThunks";

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
})

export const {} = collectionSlice.actions
export default collectionSlice.reducer
