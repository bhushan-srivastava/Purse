import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()

    const onFinish = values => {
        // if correct values then antd success message or antd error message
        console.log('Success:', values);
        message.success("Registration successful")
        navigate("/welcome") // make this "/"
    };

    // const onFinishFailed = errorInfo => {
    //     console.log('Failed:', errorInfo);
    //     message.error("Registration unsuccessful")
    // };

    return (
        <div className="register-page">
            <div className="register-box">
                <Form
                    name="register-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >

                    <Typography.Title>
                        Register to Purse
                    </Typography.Title>

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