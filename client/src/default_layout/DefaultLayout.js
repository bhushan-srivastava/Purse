import { Layout, Typography } from 'antd';
import logo from "../static/images/logo.png"
import UserOptions from '../user/UserOptions';
import CRUDTransactionButtons from '../transactions/table/CRUDTransactionButtons';

const DefaultLayout = (props) => {
    return (
        <Layout>
            <Layout.Header className='layout-header'>
                <p className='title'>
                    <a href="/">
                        <img src={logo} className="logo" alt="Purse-logo" />
                        Purse
                    </a>
                </p>

                <UserOptions />
            </Layout.Header>

            <Layout.Content className='layout-content'>

                <Layout className='main-content-layout'>
                    <Typography.Title>{props.children[0]}</Typography.Title>

                    <Layout.Header className='layout-header'>
                        <CRUDTransactionButtons />
                    </Layout.Header>

                    <Layout.Content>
                        {console.log(props, props.children)}
                        {props.children[1]}
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
}

export default DefaultLayout;