import { Button, Form, Input } from 'antd';

const Login = () => {
    // <div>
    //     Login
    //     {/* constantly keep showing login (if not logged in)
    //         and show "/" if logged in */}
    // </div>

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                            type='email'
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input
                            type='password'
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <a href="/forgot">Forgot password</a>
                    </Form.Item>

                    <Form.Item>
                        <a href="/register">Or register now!</a>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;