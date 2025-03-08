import { createSlice } from "@reduxjs/toolkit";

const switchSlice = createSlice({
    name: "switch",
    initialState: {
        isProfileNav: false,
        isMobileOptions: false,
        isSignup: false,
        isDetailCard: false,
        isProfileEdit: false,
        loader: false,
        isEmailVerified: false
    },
    reducers: {
        toggleProfileNav: (state, action) => {
            state.isProfileNav = action.payload
        },
        toggleMobileOptions: (state, action) => {
            state.isMobileOptions = action.payload
        },
        toggleSignUp: (state, action) => {
            state.isSignup = action.payload
        },
        toggleConnectionDetail: (state, action) => {
            state.isDetailCard = action.payload
        },
        setLoader: (state, action) => {
            state.loader = action.payload
        },
        toggleProfileEdit: (state, action) => {
            state.isProfileEdit = action.payload
        },
        setIsEmailVerified: (state, action) => {
            state.isEmailVerified = action.payload
        },
        setIsDetailCard: (state, action) => {
            state.isDetailCard = action.payload
        },


    }
})

export const { toggleProfileNav, toggleMobileOptions, toggleSignUp, toggleConnectionDetail, setLoader, toggleProfileEdit, setIsEmailVerified, setIsDetailCard } = switchSlice.actions
export default switchSlice.reducer