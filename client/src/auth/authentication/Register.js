import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()

    const onFinish = values => {
        console.log('Success:', values);
        message.success("Registration successful")
        navigate("/welcome") // make this "/"
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error("Registration unsuccessful")
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <img src="../../../public/favicon.png" alt="Purse-logo" />
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