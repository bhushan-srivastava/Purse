import { Dropdown, message } from 'antd';
import { LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const UserOptions = () => {
    const navigate = useNavigate()

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'GET'
        })

        const responseData = await response.json()

        if (responseData.message === 'Logout successful') {
            message.success(responseData.message)
            navigate("/welcome")
        }
        else {
            message.error(responseData.message)
        }
    }

    const onClick = (event) => {
        if (event.key === 'logout') {
            logout()
        }
    }

    const items = [
        {
            label: 'Logout',
            key: 'logout',
            danger: true,
            icon: <LogoutOutlined />
        }
    ]

    const name = document.cookie.replace('purseName=', '')

    return (
        <Dropdown menu={{ items, onClick }} trigger={['click']} placement='bottomRight' className='user-dropdown-list'>
            {/* <p>User</p> */}
            <p>{name}</p>
            {/* user get using local storage */}
        </Dropdown>
    );
}

export default UserOptions;