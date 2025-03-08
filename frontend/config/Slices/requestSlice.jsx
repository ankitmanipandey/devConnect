import { createSlice } from "@reduxjs/toolkit"
const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        updateRequests: (state, action) => {
            return state.filter((user) => user._id !== action.payload)
        }
    }
})

export const { addRequests, updateRequests } = requestSlice.actions
export default requestSlice.reducer