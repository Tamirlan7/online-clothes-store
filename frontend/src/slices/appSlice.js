import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    device: {
        width: null,
        height: null
    },
    cart: {
        visible: false,
    }
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeDeviceSize(state, action) {
            /*
            * device: {
            *   width: number
            *   height: number
            * }
            *  */

            state.device.width = action.payload['width']
            state.device.height = action.payload['height']
        },
    }
})


export const {changeDeviceSize} = appSlice.actions
export default appSlice.reducer
