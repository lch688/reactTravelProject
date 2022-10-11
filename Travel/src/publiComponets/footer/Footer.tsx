import React from 'react';
import {Layout,Typography} from 'antd'
import style from './Footer.module.css'
import {useTranslation}from 'react-i18next'




export const Footer:React.FC=() =>{
    const {t}=useTranslation()


    return(
        <div className={style['foot-wraper']}>
            <Layout.Footer >
    
                <Typography.Title level={3} style={{ textAlign: "center", paddingTop: "10px"}}>
                    {t('footer.detail')}

                </Typography.Title>
            </Layout.Footer>
        </div>
    )
}