import { Dropdown } from 'antd';
import { EditFilled, LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const UserOptions = () => {
    const navigate = useNavigate()

    const onClick = (event) => {
        if (event.key === 'change-password') {
            console.log('change password procedure please');
            navigate("/forgot")
        }
        else if (event.key === 'logout') {
            console.log('logout procedure please');
        }
    }

    const items = [
        {
            label: 'Change password',
            key: 'change-password',
            icon: <EditFilled />
        },
        {
            label: 'Logout',
            key: 'logout',
            danger: true,
            icon: <LogoutOutlined />
        }
    ]

    return (
        <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='user-dropdown-list'>
            <p>User</p>
            {/* user get using local storage */}
        </Dropdown>
    );
}

export default UserOptions;