import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";



interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
    comments:any[]
    id:string
}

const initialState: ProductDetailState = {
    loading: false,
    error: null,
    data: null,
    comments:[{
        author: null,
        avatar: null,
        content: "no conments",
        createDate: null,
    }],
    id:''
};


export const getProductDetail = createAsyncThunk(
    "productsDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(

            `/project/travel/details/${touristRouteId}`
        );
        if (data.success){
            return {
                id:data.data.id,
                content:data.data.content
            };
        }else {
            message.error('error')
        }
        /*

            const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        return data



        */



    }
);

export const getProductCommetns = createAsyncThunk(
    "productsDetail/getProductCommetns",
    async () => {
        const { data } = await axios.get(
            `/project/travel/comment`
        );
        if (data.success){
            return data.data;
        }

    }
);



export const productsDetailSlice=createSlice({
    name:"productsDetail",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getProductDetail.pending.type]:(state)=>{
            state.loading=false
        },
        [getProductDetail.fulfilled.type]:(state,action)=>{

            ///state.data=action.payload
            state.data=action.payload.content
            state.id=action.payload.id
            state.loading=true
            state.error=null
        },
        [getProductDetail.rejected.type]:(state,action)=>{
            state.loading=true
            state.error=action.payload
        },
        [getProductCommetns.fulfilled.type]:(state,action)=>{

            state.comments=action.payload
        }
    }
})