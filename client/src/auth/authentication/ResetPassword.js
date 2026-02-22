import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import Loader from '../../loaders/Loader';
import { useAuth } from '../AuthContext';

const ResetPassword = () => {
    const navigate = useNavigate()
    const { logout } = useAuth();

    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        logout()
            .then(() => { setIsLoading(false) })
            .catch(() => { setIsLoading(false) })
    }, [logout])

    const resetPassword = async (formValues) => {
        if (!emailSent) {
            setIsLoading(true)
            try {
                const response = await fetch('/api/auth/forgot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                });
                const responseData = await response.json();
                if (responseData.message === 'Reset code sent') {
                    setEmailSent(true)
                    message.success(responseData.message)
                } else {
                    message.error(responseData.message)
                }
            } catch (error) {
                message.error(error.message || 'Failed to send reset code');
            } finally {
                setIsLoading(false)
            }
        }
        else {
            setIsLoading(true)
            try {
                const response = await fetch('/api/auth/forgot/password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                });
                const responseData = await response.json();
                if (responseData.message === 'Password reset successful') {
                    message.success(responseData.message)
                    navigate("/login")
                } else {
                    message.error(responseData.message)
                }
            } catch (error) {
                message.error(error.message || 'Failed to reset password');
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <div className="reset-page">
            {isLoading ? <Loader /> : null}
            <div className="reset-box">
                <Form
                    name="reset-form"
                    onFinish={resetPassword}
                // onFinishFailed={onFinishFailed}
                >

                    <Typography.Title>
                        Reset password
                    </Typography.Title>

                    <p>
                        Please enter your email to get a verification code.
                        <br />
                        It may take some time for the email to reach.
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

                    {emailSent ?
                        <>
                            <Form.Item
                                name="verificationCode"
                                rules={[{ required: true, message: 'Please enter the verification code!' }]}
                            >
                                <Input
                                    size='large'
                                    placeholder="Code"
                                />
                            </Form.Item>

                            <Form.Item
                                name="newPassword"
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
                        :
                        null
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
