import React,{useEffect} from 'react';
import styles from './placeOrder.modulce.css'
import {MianLayout} from  '../../layout'
import {Row,Col} from "antd";
import {PaymentForm,CheckOutCard} from './components'
import {placeOrder} from  './RTK/slice'
import {useSelector,useDispatch} from "../../redux/hooks";
import {useNavigate} from  'react-router-dom'
export const PlaceOrder:React.FC=() =>{

    const orderData=useSelector(state =>state.order.currentOrder )
    const loading=useSelector(state =>state.order.loading )
    const error=useSelector(state =>state.order.error )
    const jwt=useSelector(state =>state.Login.token) as string
    const orderId=useSelector(state =>state.order.orderId)


    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(() =>{
        if (orderData ==null){
           navigate('/shoppingcar')
        }
    },[orderData])


    return(
        <MianLayout>
               <Row>
                   <Col span={12}>
                        <PaymentForm />
                   </Col>

                   <Col span={12}>
                        <CheckOutCard loading={loading} order={orderData} onCheckout={() =>{
                            dispatch(placeOrder({jwt,orderId:orderData.id}))
                        }} />
                   </Col>
               </Row>
            <p>{orderId}</p>
            {
            orderId?<p>(This orderId is returned by the backend to prove that different orders can be handled)</p>:null
            }

        </MianLayout>

    )
}