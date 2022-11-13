import { Dropdown } from 'antd';
import { EditOutlined, UserDeleteOutlined, LogoutOutlined } from "@ant-design/icons"

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
]

const UserOptions = () => {
    return (
        <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight' className='user-dropdown-list'>
            <p>User</p>
            {/* user get using local storage */}
        </Dropdown>
    );
}

export default UserOptions;