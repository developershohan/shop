import {createSlice} from "@reduxjs/toolkit"

// create auth slice
const userSlice = createSlice({
    name: "user",
    initialState:{
        user:null,
        message:null,
        error:false,
        loader: false,
        loginState:false,
    },
    reducers: {
        signInPending: (state)=>{
            state.loader = true

        },
        signInSuccess:(state,action)=>{
            state.loader = false,
            state.user =  action.payload,
            state.error = false,
            state.loginState = true
        },
        signInRejected:(state,action)=>{
            state.loader = false,
            state.error = action.payload
        },
        signOutSuccess:(state)=>{
            state.user = null,
            state.loader = false,
            state.error = false,
            state.loginState = false
        },
    },
    extraReducers:()=>{}
})

// selector

// actions
export const {signInPending,signInSuccess,signInRejected,signOutSuccess}= userSlice.actions

// reducer
export default userSlice.reducer