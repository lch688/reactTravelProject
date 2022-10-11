import React from 'react';
import styles from './shoppingcart.module.css'
import {MianLayout} from  '../../layout'
import {ProductList} from '../Search/components/productList'
import {PaymentCard} from  './component'
import {Affix, Row, Col, message} from 'antd'
import {useSelector,useDispatch} from "../../redux/hooks";
import {deleteShoppingCartData,payshoppingcart} from  './RTK/slice'
import {useNavigate } from  'react-router-dom'


export const ShoppingCart:React.FC=() =>{

    const loading = useSelector((state) => state.ShoppingCart.loading);
    const shoppingCartItems = useSelector((state) => state.ShoppingCart.item);
    const error = useSelector((state) => state.ShoppingCart.error);
    const jwt = useSelector((state) => state.Login.token) as string;
    const dispatch = useDispatch();
    const navigate=useNavigate()

    return(
       <MianLayout>
           <Row>
               <Col span={16}>
                   <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map((state) => state.touristRoute)} />
                   </div>
               </Col>

               <Col span={8}>
                   <Affix>
                       <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems
                                    .map((s) => s.originalPrice *
                                    (s.discountPresent ? s.discountPresent : 1))
                                    .reduce((a, b) => a + b, 0)}
                                onShoppingCartClear={() =>{
                                    if (shoppingCartItems.length >0){
                                        dispatch(deleteShoppingCartData({
                                            jwt,
                                            itemIds:shoppingCartItems.map((s) =>s.id)
                                        }))
                                    }else {
                                        message.warn('no products')
                                    }

                                }}
                                onCheckout={ async () =>{
                                    if(shoppingCartItems.length >0){
                                        await dispatch(payshoppingcart(jwt))
                                        if (error ===null){
                                            navigate('/placeorder')
                                            return
                                        }
                                        message.warn("error:"+error)

                                    }else {
                                        message.warn('no products')
                                    }
                                }}
                            />
                       </div>
                   </Affix>
               </Col>

           </Row>
       </MianLayout>

    )
}