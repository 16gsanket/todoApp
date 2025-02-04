import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateInterface{
    user : {email:string} | null
    isAuthenticated:Boolean
    isLoading:Boolean
}

const initialState : stateInterface= {
    user:null,
    isAuthenticated:false,
    isLoading:false
}

const authSlice = createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            // a refucer function to add the user to the store
            setUser(state , action : PayloadAction<{email:string}>){
                state.user = action.payload
                state.isAuthenticated = true
            },
            // reducer function to remove the user from the store
            removeUser(state){
                state.user =null,
                state.isAuthenticated = false
            },
            setLoading(state,action :  PayloadAction<boolean>){
                state.isLoading = action.payload
            }
        }
    }
)

export const {setUser , removeUser , setLoading}= authSlice.actions;
export default authSlice.reducer;