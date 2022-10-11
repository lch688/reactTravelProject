import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from  './Login.module.css'
import {authLogin} from  './RTK/slice'
import {useSelector,useDispatch} from  '../../redux/hooks'
import {useNavigate} from 'react-router-dom'
import {useEffect} from "react"
import {message} from  'antd'

export const LoginForm = () => {
    const loading=useSelector(state=>state.Login.loading)
    const error=useSelector(state=>state.Login.error)
    const jwt=useSelector(state=>state.Login.token)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if (jwt !== null){
           navigate('/')

        }
        if ( error !==null){
            message.error('error:' + error)
        }

    },[jwt,error])


    const onFinish = (values) => {
        dispatch(authLogin({
            username:values.username,
            password:values.password
        }))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={styles['login-form']}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    { max:50,message:'no more than 50 letters'},
                    {
                        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,

                        message: 'Incorrect Email Address',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

