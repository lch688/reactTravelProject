import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";



interface HomepageState {
    productslist:any[];
    loading:boolean;
    error:any;
}

const initialState: HomepageState = {
    productslist:[],
    loading:false,
    error:null,
};


export const getHomepageProducts = createAsyncThunk(
    "Homepage/getHomepageProducts",
    async () => {

        const {data}  = await axios.get(
            "/project/travel/products"

        );

       if (data.success ===true){
            return data.data
       }
        message.warning('error')

    }
);





export const HomepageSlice=createSlice({
    name:"Homepage",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getHomepageProducts.pending.type]:(state)=>{
            state.loading=false
        },
        [getHomepageProducts.fulfilled.type]:(state,action)=>{
            state.loading=true
            state.productslist=action.payload
            state.error=null

        },
        [getHomepageProducts.rejected.type]:(state,action)=>{
            state.error='error'
            state.loading=true
        },

    }
})