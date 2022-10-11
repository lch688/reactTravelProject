import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    item:any[];
}

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    item:[],

};


export const getShoppingCartData = createAsyncThunk(
    "ShoppingCart/getShoppingCartData",
    async ( jwt:string,thunkAPI) => {


        const {data} = await  axios.get('/project/travel/shoppingcarItems', {
            headers:{
                Authorization:`bearer ${jwt}`
            }
        })
            if (data.success){
                return data.data.shoppingCartItems
            }else {
                return  []
            }

    }
);
export const addShoppingCartData = createAsyncThunk(
    "ShoppingCart/addShoppingCartData",
    async ( parameters:{
        touristRouteId:string,
        jwt:string
    },thunkAPI) => {


        const {data} = await  axios.post('/project/travel/shoppingcarItems',
        {
            touristRouteId: parameters.touristRouteId,
            },
        {
            headers: {
                Authorization: `bearer ${parameters.jwt}`,
                },

              }
        )
        if(data.success){
            message.success('add success  '+data.data)

        }else {
            message.error('add error')
        }
        return data.data
    }
);
export const deleteShoppingCartData = createAsyncThunk(
    "ShoppingCart/deleteShoppingCartData",
    async ( parameters:{
        itemIds: number[] ,
        jwt:string
    },thunkAPI) => {


        const {data} = await  axios.delete( `/project/travel/shoppingcarItems/(${parameters.itemIds.join(",")})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },

            }
        )
        if (data.success){
            message.success('delete success  '+data.data)
        }else {
            message.error('delete error')
        }
        return data.data
    }
);

export const payshoppingcart = createAsyncThunk(
    "ShoppingCart/payshoppingcart",
    async (jwt:string,thunkAPI) => {


        const {data} = await  axios.post( `/project/travel/shoppingcarItems/checkout`,null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },

            }
        )

        return data.data
    }
);



export const ShoppingCartSlice=createSlice({
    name:"ShoppingCart",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getShoppingCartData.pending.type]:(state)=>{
            state.loading=true
        },
        [getShoppingCartData.fulfilled.type]:(state,action)=>{
            state.item=action.payload
            state.loading=false
            state.error=null
        },
        [getShoppingCartData.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },



        [addShoppingCartData.pending.type]:(state)=>{
            state.loading=true
        },
        [addShoppingCartData.fulfilled.type]:(state,action)=>{

            state.loading=false
            state.error=null

        },
        [addShoppingCartData.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },



        [deleteShoppingCartData.pending.type]:(state)=>{
            state.loading=true
        },
        [deleteShoppingCartData.fulfilled.type]:(state,action)=>{
            state.item=[]
            state.loading=false
            state.error=null
        },
        [deleteShoppingCartData.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },



        [payshoppingcart.pending.type]:(state)=>{
            state.loading=true
        },
        [payshoppingcart.fulfilled.type]:(state,action)=>{
            state.item=[]

            state.loading=false
            state.error=null

        },
        [payshoppingcart.rejected.type]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
    }
})