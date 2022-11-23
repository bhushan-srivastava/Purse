import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import Loader from "../../Loader"

const ResetPassword = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const resetPassword = async (formValues) => {
        setEmailSent(true)

        // if (!emailSent) {
        //     setIsLoading(true)

        //     const response = await fetch('/api/auth/forgot/send-email', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formValues)
        //     })

        //     const responseData = await response.json()

        //     if (responseData.message === 'Reset code sent') {
        //         setEmailSent(true)
        //         setIsLoading(false)
        //         message.success(responseData.message)
        //     }
        //     else {
        //         setIsLoading(false)
        //         message.error(responseData.message)
        //     }
        // }
        // else {
        //     setIsLoading(true)

        //     const response = await fetch('/api/auth/forgot/reset-password', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formValues)
        //     })

        //     const responseData = await response.json()

        //     if (responseData.message === 'Password reset successful') {
        //         setIsLoading(false)
        //         message.success(responseData.message)
        //         navigate("/login")
        //     }
        //     else {
        //         setIsLoading(false)
        //         message.error(responseData.message)
        //     }
        // }
    };

    return (
        < div className="reset-page" >
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