import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";
import {payshoppingcart} from  '../../ShoppingCart/RTK/slice'


interface OrderState {
    loading: boolean;
    error: string | null;
    currentOrder: any;
    orderId:string | null,
}

const initialState: OrderState = {
    loading: true,
    error: null,
    currentOrder: null,
    orderId:null,
};


export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async ( parameters: { jwt: string; orderId: string },thunkAPI) => {


        const {data} = await  axios.post(`/project/travel/shoppingcarItems/placeOrder`, {
                orderId:parameters.orderId
            },
            {
            headers:{
                Authorization:`bearer ${parameters.jwt}`
            }
        })
        return data.data
    }
);


export const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{

    },
    extraReducers:{
        [placeOrder.pending.type]:(state)=>{
            state.loading=true
        },
        [placeOrder.fulfilled.type]:(state,action)=>{
            state.currentOrder = action.payload.content;
            state.orderId=action.payload.id
            state.loading = false;
            state.error = null;
        },
        [placeOrder.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },


        [payshoppingcart.pending.type]:(state)=>{
            state.loading=true
        },
        [payshoppingcart.fulfilled.type]:(state,action)=>{

            state.currentOrder=action.payload
            state.loading=false
            state.error=null
        },
        [payshoppingcart.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
    }
})