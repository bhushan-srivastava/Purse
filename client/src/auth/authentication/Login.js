import { Button, Form, Input, message, Typography } from 'antd';
import { Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import Loader from '../../loaders/Loader';
import getAuth from '../authorization/authorization';

const Login = () => {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mounted = true;

        getAuth()
            .then((result) => {
                if (mounted) {
                    setIsLoggedIn(result)
                    setIsLoading(false)
                }
            })
            .catch(
                (error) => {
                    if (mounted) {
                        setIsLoggedIn(false)
                        setIsLoading(false)
                    }
                });

        return () => {
            mounted = false;
        }
    }, []);

    const login = async (formValues) => {
        setIsLoading(true)

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })

        const responseData = await response.json()

        if (responseData.message === 'Login successful') {
            setIsLoading(false)
            message.success(responseData.message)
            navigate("/")
        }
        else if (responseData.message === 'Password to be reset') {
            setIsLoading(false)
            message.error(responseData.message)
            navigate("/forgot")
        }
        else {
            setIsLoading(false)
            message.error(responseData.message)
        }
    }

    return (
        isLoggedIn ? <Navigate to='/' />
            :
            <div className="login-page">
                {isLoading ? <Loader /> : null}
                <div className="login-box">
                    <Form
                        name="login-form"
                        onFinish={login}
                    // onFinishFailed={onFinishFailed}
                    >

                        <Typography.Title>
                            Login to Purse
                        </Typography.Title>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!'
                                }
                            ]}
                            hasFeedback={true}
                        >
                            <Input
                                size='large'
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!'
                                },
                                {
                                    min: 8,
                                    message: 'Password must have atleast 8 characters!'
                                }
                            ]}
                            hasFeedback={true}

                        >
                            <Input.Password
                                size='large'
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <a href="/forgot">Forgot password</a>
                        </Form.Item>

                        <Form.Item>
                            <a href="/register">Or register now!</a>

                            <Button type="primary" htmlType="submit" size='large'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
    );
}

export default Login;