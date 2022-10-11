import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";


interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pageNation:any;
    search:string;
}

const initialState: ProductSearchState = {
    loading: false,
    error: null,
    data: null,
    search:"",
   pageNation:null
};


export const getSearchData = createAsyncThunk(
    "productsSearch/getSearchData",
    async (paramaters: {
        keyword:string,
        nextPage: number | string;
        pageSize: number | string;
    },thunkAPI) => {

        let url = `/project/travel/serach?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
        if (paramaters.keyword){
            url+=`&keyword=${paramaters.keyword}`
        }
        const res = await axios.get(url);
        if(res.data.success){
            return {
                data:res.data.data.content,
                search:res.data.data.search,
                page:JSON.parse(res.headers["x-pagination"])
            }
        }else {
            message.error('error')
        }


    }
);





export const productsSearchSlice=createSlice({
    name:"productsSearch",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getSearchData.pending.type]:(state)=>{
            state.loading=false
        },
        [getSearchData.fulfilled.type]:(state,action)=>{


            state.data=action.payload.data
            state.search=action.payload.search
            state.pageNation=action.payload.page
            state.loading=true
            state.error=null
        },
        [getSearchData.rejected.type]:(state,action)=>{
            state.loading=true
            state.error=action.payload
        },

    }
})