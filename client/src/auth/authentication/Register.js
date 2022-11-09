import { Button, Form, Input } from 'antd';

const Register = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <Form
                    name="register-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h1>Register to Purse</h1>
                    <Form.Item
                        name="first-name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input
                            placeholder="First name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input
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
                        <a href="/login">Or login instead</a>

                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form >
            </div >
        </div >
    );
}

export default Register;