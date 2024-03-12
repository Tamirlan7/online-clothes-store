import {createSlice} from "@reduxjs/toolkit";
import {addClothingTypeThunk, getAllClothingTypesThunk} from "../thunks/clothingTypeThunks";

const initialState = {
    clothingTypes: [],
    loading: false,
    error: false,
    errorMessage: null
}


const clothingTypeSlice = createSlice({
    name: 'clothingType',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAllClothingTypesThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllClothingTypesThunk.fulfilled, (state, action) => {
                state.loading = false

                if (Array.isArray(action.payload)) {
                    state.clothingTypes = action.payload
                }
            })
            .addCase(getAllClothingTypesThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })


            .addCase(addClothingTypeThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(addClothingTypeThunk.fulfilled, (state, action) => {
                state.loading = false

                if (action.payload['name']) {
                    state.clothingTypes.push(action.payload)
                }
            })
            .addCase(addClothingTypeThunk.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.payload
            })
})


export const {} = clothingTypeSlice.actions
export default clothingTypeSlice.reducer
