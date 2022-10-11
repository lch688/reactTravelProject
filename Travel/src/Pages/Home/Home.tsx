import React ,{useEffect}from 'react';
import style from './Home.module.css';
import {SideMenu,Carousel,ProductCollection,CooCom} from './components'
import {withTranslation,WithTranslation} from 'react-i18next'
import {Row,Col,Typography,Spin} from 'antd'
import sideImage from '../../assets/images/sider_001.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_01.png';
import * as actionCreator from './redux/actionCreator'
import {MianLayout} from '../../layout/'
import {useSelector,useDispatch} from "../../redux/hooks";
import {useTranslation} from 'react-i18next'
import {getHomepageProducts} from  './RTK/slice'


export const HomePage:React.FC=() => {




    const {t}=useTranslation()
    const productlist =useSelector(state => state.HomeData.productslist)
    const loading =useSelector(state => state.HomeData.loading)
    const error =useSelector(state => state.HomeData.error)
    const dispatch=useDispatch()

    useEffect(() =>{
       dispatch(getHomepageProducts())
    },[])





      if (!loading) {
          return (
              <Spin
                  size="large"
                  style={{
                      marginTop: 200,
                      marginBottom: 200,
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "100%",
                  }}
              />
          );
      }
      if (error) {
          return <div>website error：{error}</div>;
      }

    return (

        <MianLayout>
          

            <Row style={{marginTop: 20}}>
                <Col span={6}>
                    <SideMenu/>
                </Col>
                <Col span={18}>
                    <Carousel/>
                </Col>

            </Row>
            <ProductCollection
                title={<Typography.Title level={3} type="warning">
                    {t('home_page.hot_recommended')}
                </Typography.Title>}
                sideImage={sideImage}
                products={productlist[0].touristRoutes}/>
            <ProductCollection
                title={<Typography.Title level={3} type="danger">
                    {t('home_page.hot_recommended')}
                </Typography.Title>}
                sideImage={sideImage2}
                products={productlist[1].touristRoutes}/>
            <ProductCollection
                title={<Typography.Title level={3} type="success">
                    {t('home_page.domestic_travel')}
                </Typography.Title>}
                sideImage={sideImage3}
                products={productlist[2].touristRoutes}/>

            <CooCom/>

        </MianLayout>

    );


  
}



