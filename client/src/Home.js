import { Layout, Typography } from 'antd';
import logo from "./static/images/logo.png"
import CRUDTransactionButtons from './transactions/table/CRUDTransactionButtons';
import TransactionsTable from './transactions/table/TransactionsTable';
import UserOptions from './user/UserOptions';

const Home = () => {
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
                    <Typography.Title>Transactions</Typography.Title>

                    <Layout.Header className='layout-header'>
                        <CRUDTransactionButtons />
                    </Layout.Header>

                    <Layout.Content>
                        <TransactionsTable />
                        {/* graph */}
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
}

export default Home;