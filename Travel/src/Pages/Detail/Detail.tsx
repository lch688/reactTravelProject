import React,{useEffect} from 'react';
import styles from './Detail.module.css'
import {useParams} from 'react-router-dom';
import {Spin, Row, Col, Divider, Typography, Anchor, Menu, message,Button} from "antd";
import { ProductIntro,ProductComments} from "./components";
import { DatePicker} from "antd";
import {useSelector,useDispatch} from '../../redux/hooks'
import {MianLayout} from '../../layout/'
import {getProductDetail,getProductCommetns} from './RTK/slice'
import { ShoppingCartOutlined } from "@ant-design/icons";
import {addShoppingCartData} from  '../ShoppingCart/RTK/slice'
const {RangePicker}=DatePicker



type MatchParams={
    routeId:string,
    
}

export const Detail:React.FC=(props) =>{
    const {routeId}=useParams<MatchParams>()
    const load=useSelector((state) => state.productsDetail.loading)
    const productinfo=useSelector((state) => state.productsDetail.data)
    const error=useSelector((state) => state.productsDetail.error)
    const comments=useSelector((state) => state.productsDetail.comments)
    const id=useSelector((state) => state.productsDetail.id)
    const dispath=useDispatch()

    const jwt=useSelector((state) => state.Login.token)
    const shoppingloading=useSelector((state) => state.ShoppingCart.loading)



    useEffect(() =>{
        if (routeId !=null){
            dispath(getProductDetail(routeId))
        }
        dispath(getProductCommetns())

    },[routeId])


  
    
    
   
    if (!load){
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
    if (error){
        return <div>website error：{error}</div>;
    }
    return(
        <MianLayout>

                    <div className={styles['product-intro-container']}>
                        <Row>
                            <Col span={13} >
                                <ProductIntro
                                    title={productinfo.title}
                                    shortDescription={productinfo.description}
                                    price={productinfo.originalPrice}
                                    coupons={productinfo.coupons}
                                    points={productinfo.points}
                                    discount={productinfo.price}
                                    rating={productinfo.rating}
                                    pictures={productinfo.touristRoutePictures.map((p) => p.url)}
                                />
                            </Col>
                            <Col span={11} >
                                <Button
                                    style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                                    type="primary"
                                    danger
                                    loading={shoppingloading}
                                    onClick={() =>{

                                            jwt ? dispath(addShoppingCartData({
                                                jwt,
                                                touristRouteId: productinfo.id
                                            })) : message.warn('please login first')}}

                                >
                                    <ShoppingCartOutlined />
                                    add to shoppingcart
                                </Button>

                                <RangePicker  open style={{ marginTop: 20 }} />
                            </Col>
                        </Row>
                    </div>


                     <Anchor className={styles["product-detail-anchor"]}>
                            <Menu mode="horizontal">
                                <Menu.Item key="1">
                                    <Anchor.Link href="#feature" title="Feature"></Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Anchor.Link href="#fees" title="Fee"></Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Anchor.Link href="#notes" title="Notes"></Anchor.Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Anchor.Link href="#comments" title="Comments"></Anchor.Link>
                                </Menu.Item>
                            </Menu>
                    </Anchor>




                    {/* feature */}
                    <div id="feature" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}> Product Feature </Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{__html:productinfo.features}}
                            style={{margin:50}}

                        />
                    </div>


                    {/* fees */}
                    <div id="fees" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}> Product Fees</Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{ __html: productinfo.fees }}
                            style={{ margin: 50 }}
                        />

                    </div>

                    {/* notes */}
                    <div id="notes" className={styles["product-detail-container"]}>
                        <Divider orientation={"center"}>
                            <Typography.Title level={3}>Notes</Typography.Title>
                        </Divider>
                        <div
                            dangerouslySetInnerHTML={{__html:productinfo.notes}}
                            style={{margin:50}}
                        />
                    </div>
                    {/* comments*/}
                    <div id="comments" className={styles["product-detail-container"]}>
                        <ProductComments data={comments} />
                    </div>
                    <p>{id}</p>
                    <p>(The ID returned by the back end is used to prove that this page can be different)</p>
        </MianLayout>

    )
}