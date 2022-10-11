import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {message} from "antd";
import i18n from "i18next";



interface HeaderState {
    language:"en" | "zh";
    languageList:{
        name:string,
        code:string
    }[];
}

const initialState: HeaderState = {
    language:"en",
    languageList:[
        {name:'English',code:'en'},
        {name:'中文',code:'zh'},

    ],
};







export const HeaderSlice=createSlice({
    name:"Header",
    initialState,
    reducers:{
        changelanuage:(state,action:PayloadAction<"en" | "zh">) =>{
            i18n.changeLanguage(action.payload)
            state.language=action.payload
        }
    },

})