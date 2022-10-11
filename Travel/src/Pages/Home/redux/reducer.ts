import * as actiontype from './actionType'
import {actionType} from './actionCreator'

interface Home{
    language:"en" | "zh";
    languageList:{
        name:string,
        code:string
    }[];
    productslist:any[];
    loading:boolean;
    error:any;
}

const defaultState:Home={
    language:"zh",
    languageList:[
        {name:'中文',code:'zh'},
        {name:'English',code:'en'}
    ],
    productslist:[],
    loading:false,
    error:null,
}




export const HomeReducer = (state=defaultState,action:actionType) =>{

    switch (action.type){
        case actiontype.CHANGELANGUAGETYPE :
            const newState_change={...state,language:action.payload};
            return newState_change;

        case actiontype.STARTGETPRODUCTS :
            const start_req_state={...state,
                loading:false,


            };
            return start_req_state;
        case actiontype.SENDPRODUCTSSUCCESS :
            const newState_send_success={...state,
                    productslist:action.payload,
                    loading:true

            };
            return newState_send_success;

        case actiontype.SENDPRODUCTSFAIL :
            const newState_send_fail={...state,
                loading:true,
                error:action.payload

            };
            return newState_send_fail;

        default:
            return state;
        }





}