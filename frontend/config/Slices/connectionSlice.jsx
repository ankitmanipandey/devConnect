import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload
        },
        updateConnections: (state, action) => {
            return state.filter((user) => user._id !== action.payload)
        }
    }
})

export const { addConnections ,updateConnections} = ConnectionSlice.actions
export default ConnectionSlice.reducer