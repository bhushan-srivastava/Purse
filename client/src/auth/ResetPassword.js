import { Button, Form, Input, InputNumber, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

const ResetPassword = () => {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        let mounted = true;

        fetch('/api/auth', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseData => {
                if (mounted) {
                    if (responseData.message === 'Authorized') {
                        setIsLoggedIn(true)
                    }
                    else {
                        setIsLoggedIn(false)
                    }
                }
            })
            .catch(
                (err) => {
                    if (mounted) {
                        setIsLoggedIn(false)
                    }
                });

        return () => {
            mounted = false;
        }
    }, []);


    const onFinish = values => {
        // if correct values then antd success message or antd error message
        console.log('Success:', values);
        message.success("Password reset successful")
        navigate("/welcome") // make this "/"
    };

    // const onFinishFailed = errorInfo => {
    //     console.log('Failed:', errorInfo);
    //     message.error("Password reset unsuccessful")
    // };

    return (
        <div className="reset-page">
            <div className="reset-box">
                <Form
                    name="reset-form"
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >

                    <Typography.Title>
                        Reset password
                    </Typography.Title>

                    {!isLoggedIn ?
                        <>
                            <p>
                                Please enter your email.
                                <br />
                                We will send a verification code to your email
                            </p>

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
                        </>
                        :
                        <>
                            <p>
                                Please enter the verification code sent to your email.
                                <br />
                                It may take some time for the email to reach.
                            </p>

                            <Form.Item
                                name="verification-code"
                                rules={[{ required: true, message: 'Please enter the verification code!' }]}
                            >
                                <InputNumber
                                    size='large'
                                    placeholder="Code"
                                />
                            </Form.Item>

                            <Form.Item
                                name="new-password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your new password!'
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
                                    placeholder="New password"
                                />
                            </Form.Item>
                        </>
                    }

                    <Form.Item>
                        <a href="/login">Back to login</a>

                        <Button type="primary" htmlType="submit" size='large'>
                            Reset
                        </Button>
                    </Form.Item>
                </Form >
            </div >
        </div >
    );
}

export default ResetPassword;