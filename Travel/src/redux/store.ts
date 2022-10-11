import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {actionLog} from  '../middleware/actionLog'
import {productsDetailSlice} from '../Pages/Detail/RTK/slice'
import {productsSearchSlice} from  '../Pages/Search/RTK/slice'
import {LoginSlice} from  '../Pages/Login/RTK/slice'
import {HomeReducer} from '../Pages/Home/redux/reducer'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from  'redux-persist'
import storage from  'redux-persist/lib/storage'
import {ShoppingCartSlice} from  '../Pages/ShoppingCart/RTK/slice'
import {orderSlice} from  '../Pages/placeOrder/RTK/slice'
import {HomepageSlice} from  '../Pages/Home/RTK/slice'
import {HeaderSlice} from  '../publiComponets/header/RTK/slice'

const persistConfig ={
    key :"root",
    storage,
    whitelist:["Login"]
}
const LoginpersisConfig ={
    key :"login",
    storage,
    whitelist:["token"]
}

const LoginReducer=persistReducer(LoginpersisConfig,LoginSlice.reducer)

const rootReducer = combineReducers({
    HomeData:HomepageSlice.reducer,
    HeaderData:HeaderSlice.reducer,
    productsDetail:productsDetailSlice.reducer,
    productsSearch:productsSearchSlice.reducer,
    Login:LoginReducer,
    ShoppingCart:ShoppingCartSlice.reducer,
    order:orderSlice.reducer
})
const persistedReducer=persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(actionLog),
    devTools: true,
});

const persistor=persistStore(store)

export type Rootstate = ReturnType<typeof  store.getState>
export type AppDispatch = typeof store.dispatch;

export default {store,persistor}