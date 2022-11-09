import { Button, Form, Input } from 'antd';

const ForgotPassword = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="forgot-page">
            <div className="forgot-box">
                <Form
                    name="forgot-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h1>Reset password</h1>
                    <span>
                        Please enter the verification code sent to your email.
                        <br />
                        It may take some time for the mail to reach.
                    </span>

                    <Form.Item
                        name="verification-code"
                        rules={[{ required: true, message: 'Please enter the verification code' }]}
                    >
                        <Input
                            type='number'
                            placeholder="Verification code"
                        />
                    </Form.Item>

                    <Form.Item
                        name="new-password"
                        rules={[{ required: true, message: 'Please enter your new password!' }]}
                    >
                        <Input
                            type='password'
                            placeholder="New password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <a href="/login">Back to login</a>

                        <Button type="primary" htmlType="submit" className="forgot-form-button">
                            Reset
                        </Button>
                    </Form.Item>
                </Form >
            </div >
        </div >
    );
}

export default ForgotPassword;