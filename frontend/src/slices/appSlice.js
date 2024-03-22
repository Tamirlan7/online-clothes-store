import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    device: {
        width: null,
        height: null
    },
    cart: {
        visible: false,
    },
    footer: {
        visible: true,
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
        changeFooterVisible(state, action) {
            if (typeof action.payload === 'boolean') {
                state.footer.visible = action.payload
            }
        }
    }
})


export const {changeDeviceSize, changeFooterVisible} = appSlice.actions
export default appSlice.reducer
