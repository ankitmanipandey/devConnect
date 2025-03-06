import { configureStore } from "@reduxjs/toolkit";
import switchReducer from "../config/switchSlice"
import userReducer from "../config/userSlice"
import feedReducer from "../config/feedSlice"
import requestReducer from "../config/requestSlice"
import connectionReducer from "./connectionSlice"
import chatReducer from "./chatSlice"
const appStore = configureStore({
    reducer: {
        switch: switchReducer,
        user: userReducer,
        feed: feedReducer,
        request: requestReducer,
        connection: connectionReducer,
        chat: chatReducer
    }
})
export default appStore