import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        updateFeed: (state, action) => {
            return state.filter((user) => user._id !== action.payload)
        }
    }
})

export const { addFeed, updateFeed } = feedSlice.actions
export default feedSlice.reducer