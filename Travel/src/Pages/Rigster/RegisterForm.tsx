import { Button, Checkbox, Form, Input ,message} from 'antd';
import React from 'react';
import style from './Rigster.module.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {isRegExp} from "util/types";
interface aa{
    message:string
}
export  const RefisterFrom = () => {
    const  navigate=useNavigate()
    const onFinish = async (values) => {
        try {
            const res= await axios.post('http://123.56.149.216:8080/auth/register',{
                "email": values.username,
                "password": values.password,
                "confirmPassword": values.confirm
            })

            navigate('/login')
        }catch(e) {
            message.error('register fail ,please try again')
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={style['register-form']}
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
            autoComplete="on"
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
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,30}$/,

                        message: 'The password must contain numbers and letters, 4-30 digits',
                    }

                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirm"
                hasFeedback
                rules={[
                    {required: true, message: 'Please input your password!',},
                    ({ getFieldValue }) => ({
                        validator(_, value) {

                            if (getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Password inconsistent！");
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

