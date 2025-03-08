import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        targetUserId: null,
        targetPhotoUrl: null,
        targetUserName: null
    },
    reducers: {
        setTargetUserId: (state, action) => {
            state.targetUserId = action.payload
        },
        setTargetPhotoUrl: (state, action) => {
            state.targetPhotoUrl = action.payload
        },
        setTargetUserName: (state, action) => {
            state.targetUserName = action.payload
        },

    }
})

export const { setTargetUserId, setTargetPhotoUrl, setTargetUserName } = chatSlice.actions
export default chatSlice.reducer