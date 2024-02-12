import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notification: {
        description: '',
        message: '',
        placement: 'topRight',
        type: 'info'
    },
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        raiseNotification(state, action) {
            /*
            * action.payload = {
            *   description: string,
            *   message: string,
            *   placement: string <- default value: topRight
            *   type: 'error' | 'info' | 'success' and bla-bla-bla (check out antd documentation about notifications)
            * }
            * */

            if (action.payload?.description) {
                state.notification.description = action.payload.description
            }

            if (action.payload?.message) {
                state.notification.message = action.payload.message
            }

            if (action.payload?.placement) {
                state.notification.placement = action.payload.placement
            }

            if (action.payload?.type) {
                state.notification.type = action.payload.type
            }
        },
        resetNotification(state) {
            state.notification = {
                placement: 'topRight',
                type: 'info',
            }
        }
    }
})


export const {raiseNotification, resetNotification} = notificationSlice.actions
export default notificationSlice.reducer
