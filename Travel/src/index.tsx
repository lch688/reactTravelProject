import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css'
import './i18next/configs'
import {Provider}from 'react-redux'
import  rootStore from './redux/store'
import axios,{AxiosError} from "axios";
import {PersistGate} from 'redux-persist/integration/react'




//Access-Control-Allow-Origin 指向前端 ip:port


axios.defaults.headers['x-icode'] = 'A9D25A596DD49349';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
     <Provider store={rootStore.store}>
         <PersistGate persistor={rootStore.persistor}>
            <App />
         </PersistGate>
     </Provider>

);


