import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const onFinish = values => {
        console.log('Success:', values);
        message.success("Login successful")
        navigate("/welcome") // make this "/"
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error("Login unsuccessful")
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h1>Login to Purse</h1>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input
                            size='large'
                            type='email'
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