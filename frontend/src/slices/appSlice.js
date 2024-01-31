import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    admin: {
        catalog: {},
        menu: {
            width: null,
        }
    }
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeMenuWidth(state, action) {
            if (typeof action.payload === 'number') {
                state.admin.menu = action.payload
            }
        }
    }
})


export const {changeMenuWidth} = appSlice.actions
export default appSlice.reducer
