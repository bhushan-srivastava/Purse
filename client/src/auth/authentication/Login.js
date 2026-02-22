import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Loader from '../../loaders/Loader';
import { useAuth } from '../AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (formValues) => {
        const { email, password } = formValues;
        const result = await login(email, password);

        if (result.success) {
            message.success('Login successful');
            navigate('/');
        } else {
            if (result.message === 'Password to be reset') {
                message.error(result.message);
                navigate("/forgot");
            } else {
                message.error(result.message || 'An unknown error occurred.');
            }
        }
    };

    return (
        <div className="login-page">
            {isLoading && <Loader />}
            <div className="login-box">
                <Form
                    name="login-form"
                    onFinish={handleLogin}
                >
                    <Typography.Title>
                        Login to Purse
                    </Typography.Title>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                        hasFeedback={true}
                    >
                        <Input size='large' placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 8, message: 'Password must have atleast 8 characters!' }
                        ]}
                        hasFeedback={true}
                    >
                        <Input.Password size='large' placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <a href="/forgot">Forgot password</a>
                    </Form.Item>

                    <Form.Item>
                        <a href="/register">Or register now!</a>
                        <Button type="primary" htmlType="submit" size='large' loading={isLoading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
