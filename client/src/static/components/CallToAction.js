import { Button } from 'antd';

const CallToAction = () => {

    return (
        <div className='call-to-action'>
            <a href="/login">
                <Button size='large' type='link' className='login-button'>Login</Button>
            </a>

            <a href="/register">
                <Button size='large' type='primary'>Register</Button>
            </a>
        </div>
    );
}

export default CallToAction;