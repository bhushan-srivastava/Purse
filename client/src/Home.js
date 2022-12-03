import { Layout, Typography } from 'antd';
import { useState } from 'react';
import logo from "./static/images/logo.png"
import Visualization from './transactions/graphs/Visualization';
import CRUDTransactionButtons from './transactions/table/CRUDTransactionButtons';
import TransactionsTable from './transactions/table/TransactionsTable';
import UserOptions from './user/UserOptions';

const Home = () => {
    const [view, setView] = useState('table')

    // const changeView = (nextView) => { setView(nextView) }

    const renderView = () => {
        if (view === 'table') {
            return <TransactionsTable />
        }
        else if (view === 'graph') {
            return <Visualization />
        }
    }

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
                        <CRUDTransactionButtons changeView={setView} />
                    </Layout.Header>

                    <Layout.Content>
                        {renderView()}
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
}

export default Home;