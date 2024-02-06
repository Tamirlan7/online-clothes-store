import {createSlice} from "@reduxjs/toolkit";
import {loginThunk} from "../thunks/userThunks";
import {TOKENS} from "../constants/AppConstants";

const initialState = {
    loading: false,
    error: false,
    errorMessage: null,
    roles: [],
    userId: null,
    showAuthenticationPopup: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeRoles(state, action) {
            state.roles = action.payload
        },
        changeUserId(state, action) {
            state.userId = action.payload
        },
        changeLoading(state, action) {
            state.loading = action.payload
        },
        changeShowAuthenticationPopup(state, action) {
            state.showAuthenticationPopup = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(loginThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            if (action.payload?.accessToken) {
                localStorage.setItem(TOKENS, JSON.stringify(action.payload))
            }
            state.loading = false
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.error = true
            state.errorMessage = action.payload
            state.loading = false
        })
})


export const {changeUserId, changeRoles, changeLoading, changeShowAuthenticationPopup} = userSlice.actions
export default userSlice.reducer