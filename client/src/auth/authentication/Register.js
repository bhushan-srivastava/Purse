import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()

    const register = (formValues) => {
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.message === 'User registered successfully') {
                    message.success("Registration successful")
                    navigate("/login")
                }
                else {
                    message.error(responseData.message)
                }
            });
    }

    return (
        <div className="register-page">
            <div className="register-box">
                <Form
                    name="register-form"
                    initialValues={{ remember: true }}
                    onFinish={register}
                // onFinishFailed={onFinishFailed}
                >

                    <Typography.Title>
                        Register to Purse
                    </Typography.Title>

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input
                            size='large'
                            placeholder="First name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input
                            size='large'
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password
                            size='large'
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <a href="/login">Or login instead</a>

                        <Button type="primary" htmlType="submit" size='large'>
                            Register
                        </Button>
                    </Form.Item>
                </Form >
            </div >
        </div >
    );
}

export default Register;