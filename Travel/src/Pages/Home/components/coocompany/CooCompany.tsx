import React from 'react';
import {Divider, Typography,Row,Col} from 'antd'
import style from './CooCompany.module.css'
import footerImage from '../../../../assets/images/facebook-807588_640.png';
import footerImage2 from '../../../../assets/images/microsoft-80658_640.png';
import footerImage3 from '../../../../assets/images/icon-720944_640.png';
import footerImage4 from '../../../../assets/images/follow-826033_640.png';
import {useTranslation}from 'react-i18next'






export const CooCom:React.FC=() =>{
    const {t}=useTranslation()
    return(
        <div className={style['coo-wraper']}>
                <Divider orientation="left">
                <Typography.Title level={4} >
                    {t('home_page.joint_venture')}

                </Typography.Title>
                </Divider>
                <Row  style={{paddingBottom:'10px'}}>
                    <Col span={6}>
                        <img className={style.img}
                        src={footerImage4} alt=""/>
                    </Col>
                    <Col span={6}>
                        <img className={style.img}
                        src={footerImage} alt=""/>
                    </Col>
                    <Col span={6}>
                        <img className={style.img}
                        src={footerImage2} alt=""/>
                    </Col>
                    <Col span={6}>
                        <img className={style.img}
                        src={footerImage3} alt=""/>
                    </Col>
                </Row>
                
        </div>
    )
}