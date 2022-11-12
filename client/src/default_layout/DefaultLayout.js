import { Layout, Dropdown, Typography, Button } from 'antd';
import { EditOutlined, UserDeleteOutlined, LogoutOutlined, FilterFilled, SortAscendingOutlined, PlusOutlined, EditFilled, AreaChartOutlined, TableOutlined /*, LineChartOutlined */ } from "@ant-design/icons"
import logo from "../static/images/logo.png"

const DefaultLayout = (props) => {

    const items = [
        {
            label: 'Edit name',
            key: 'edit-name',
            icon: <EditOutlined />
        },
        {
            label: 'Change password',
            key: 'change-password',
            icon: <EditOutlined />
        },
        {
            label: 'Delete account',
            key: 'delete-account',
            danger: true,
            icon: <UserDeleteOutlined />
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />
        }
    ];

    return (
        <Layout>
            <Layout.Header className='layout-header'>
                <p className='title'>
                    <a href="/">
                        <img src={logo} className="logo" alt="Purse-logo" />
                        Purse
                    </a>
                </p>

                <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight' className='user-dropdown-list'>
                    <p>User</p>
                    {/* user get using local storage */}
                </Dropdown>
            </Layout.Header>

            <Layout.Content className='layout-content'>

                <Layout className='main-content-layout'>
                    <Typography.Title>{props.children[0]}</Typography.Title>

                    <Layout.Header className='layout-header'>
                        <Button type='primary' icon={<FilterFilled />} />

                        <Button type='primary' icon={<SortAscendingOutlined />} />

                        <Button type='primary' icon={<AreaChartOutlined />} />

                        {/* <Button size='middle' type='primary' icon={<LineChartOutlined />} /> */}

                        <Button type='primary' icon={<TableOutlined />} />

                        <Button type='primary' icon={<EditFilled />}></Button>

                        <Button type='primary' icon={<PlusOutlined />} />
                    </Layout.Header>

                    <Layout.Content>
                        {console.log(props, props.children)}

                        {/* table ? props.children[1] : props.children[2]
                    props.children[0] is h1
                    props.children[1] is table
                    props.children[2] is graph
                */}
                        {props.children[1]}
                        {props.children[2]}
                    </Layout.Content>
                </Layout>
            </Layout.Content>

            {/* no need for a footer */}
            {/* <Layout.Footer className='layout-footer'>
                Purse
            </Layout.Footer> */}
        </Layout>
    );
}

export default DefaultLayout;