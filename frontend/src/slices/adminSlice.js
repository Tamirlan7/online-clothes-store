import {createSlice} from "@reduxjs/toolkit";
import {getAllAdminsThunk, registerAdminThunk} from "../thunks/adminThunks";

const initialState = {
    admins: [],
    error: false,
    loading: false,
    errorMessage: null,
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(registerAdminThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(registerAdminThunk.fulfilled, (state, action) => {
                state.admins.push({
                    username: action.payload?.username
                })
                state.loading = false
            })
            .addCase(registerAdminThunk.rejected, (state, action) => {
                state.error = true
                state.errorMessage = action.payload
                state.loading = false
            })

            .addCase(getAllAdminsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllAdminsThunk.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.admins = action.payload
                }

                state.loading = false
            })
            .addCase(getAllAdminsThunk.rejected, (state, action) => {
                state.error = true
                state.errorMessage = action.payload
                state.loading = false
            })
})

export const { } = adminSlice.actions
export default adminSlice.reducer
