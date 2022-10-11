import * as actiontype from './actionType'
import {ThunkAction} from 'redux-thunk'
import axios from "axios";
import {Rootstate} from '../../../redux/store'
import i18n from 'i18next'

interface ChangeLanguage{
    type:typeof  actiontype.CHANGELANGUAGETYPE,
    payload:"en" | "zh"
}
interface SendProductsSuccess{
    type:typeof  actiontype.SENDPRODUCTSSUCCESS,
    payload:any[]
}
interface SendProductsFail{
    type:typeof  actiontype.SENDPRODUCTSFAIL,
    payload:any
}
interface AxiosStart{
    type:typeof  actiontype.STARTGETPRODUCTS,

}

export type actionType=ChangeLanguage | SendProductsSuccess | SendProductsFail | AxiosStart



const sendproductslistSuccess=(products) :SendProductsSuccess=>{
    return {
        type:actiontype.SENDPRODUCTSSUCCESS,
        payload:products
    }
}
const sendproductslistFail=(error) :SendProductsFail=>{
    return {
        type:actiontype.SENDPRODUCTSFAIL,
        payload:error
    }
}
export const changeLanguage=(lanType:"en" | "zh") :ChangeLanguage=>{
    i18n.changeLanguage(lanType)
    return {
        type:actiontype.CHANGELANGUAGETYPE,
        payload:lanType
    }
}

export const startProductslist=() :AxiosStart=>{
    return {
        type:actiontype.STARTGETPRODUCTS,

    }
}

export const sendproductsReq=():ThunkAction<void, Rootstate, unknown, actionType> =>{
    return async (dispitch)=>{
        dispitch(startProductslist())
        try {
            const {data}  = await axios.get(
                "/api/products.json"
            );

            const action=sendproductslistSuccess(data.data)
            dispitch(action)
        } catch (error) {
            const action=sendproductslistFail(error instanceof Error ? error.message : "error")
            dispitch(action)
        }
    }
}