import React,{useEffect,useState} from 'react';
import styles from "./sideMenu.module.css";
import { Menu ,message} from "antd";
import { GifOutlined } from "@ant-design/icons";
import axios from 'axios'


    
interface side{
    title:string
    subMenu:any[]
}


export const SideMenu:React.FC= () => {

    const [data,setData] =useState([])

    useEffect(()=>{
        axios.get('/project/travel/sidemenus').then((res)=>{
            
            if(res.data.success){
               setData(res.data.data)
               
                
            }else{
                message.error('fail')
            }
        }).catch((e)=>{
            message.error(e)
        })
    },[])

       const sideMenuList:side[]=data
    
        return (
            <Menu
            mode="vertical"
            className={styles["side-menu"]}
            items={sideMenuList.map((m) => ({
                label: m.title,
                key: m.title,
                icon: <GifOutlined />,
                children: m.subMenu.map((sm) => ({
                label: sm.title,
                key: sm.title,
                icon: <GifOutlined />,
                children: sm.subMenu.map((sms) => ({
                    label: sms,
                    key: sms,
                    icon: <GifOutlined />,
                })),
                })),
            }))}
            />
      );
    
    
};
