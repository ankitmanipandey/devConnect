import { configureStore } from "@reduxjs/toolkit";
import switchReducer from "../Slices/switchSlice"
import userReducer from "../Slices/userSlice"
import feedReducer from "../Slices/feedSlice"
import requestReducer from "../Slices/requestSlice"
import connectionReducer from "../Slices/connectionSlice"
import chatReducer from "../Slices/chatSlice"
const appStore = configureStore({
    reducer: {
        switch: switchReducer,
        user: userReducer,
        feed: feedReducer,
        request: requestReducer,
        connection: connectionReducer,
        chat: chatReducer
    },
    devTools: import.meta.env.VITE_MODE !== "production"
})
export default appStore