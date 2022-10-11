import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



interface LoginState {
    loading: boolean;
    error: string | null;
    token: string | null;

}

const initialState: LoginState = {
    loading: false,
    error: null,
    token:null

};


export const authLogin = createAsyncThunk(
    "Login/authLogin",
    async (paramater:{
        username:string;
        password:string
    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/auth/login`,{
                "email": paramater.username,
                "password": paramater.password
            }
        );

        return data.token;
    }
);




export const LoginSlice=createSlice({
    name:"Login",
    initialState,
    reducers:{
        logout:(state)=>{
            state.token=null
            state.loading=false
            state.error=null

        }
    },
    extraReducers:{
        [authLogin.pending.type]:(state)=>{
            state.loading=true
        },
        [authLogin.fulfilled.type]:(state,action)=>{


            state.token=action.payload
            state.loading=false
            state.error=null
        },
        [authLogin.rejected.type]:(state,action)=>{
            state.loading=false
            state.error='fail'

        },

    }
})