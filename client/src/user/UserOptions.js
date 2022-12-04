import { Dropdown, message } from 'antd';
import { EditFilled, LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import logout from '../auth/authentication/logout';
import { useState } from 'react';
import EditName from './EditName';

const UserOptions = ({ setIsLoading }) => {
    const navigate = useNavigate()

    const [editNameFormOpen, setEditNameFormOpen] = useState(false)
    const [name, setName] = useState(decodeURI(document.cookie.replace('purseName=', '')))

    const saveName = async (formValues) => {
        setIsLoading(true)

        const response = await fetch('/api/user/name', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })

        const responseData = await response.json()

        if (responseData.message === 'Name updated successfully') {
            setName(decodeURI(document.cookie.replace('purseName=', '')))
            setIsLoading(false)
            message.success('Name saved')
        }
        else {
            setIsLoading(false)
            message.error(responseData.message)
        }

        setEditNameFormOpen(false)
    }

    const onEditNameCancel = () => { setEditNameFormOpen(false) }

    const userOptionsClick = async (event) => {
        if (event.key === 'logout') {
            await logout()
            navigate('/welcome')
        }
        else if (event.key === 'change-password') {
            navigate('/forgot')
        }
        else if (event.key === 'edit-name') {
            setEditNameFormOpen(true)
        }
    }

    const userItems = [
        {
            label: 'Edit name',
            key: 'edit-name',
            icon: <EditFilled />
        },
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
        <>
            <EditName
                open={editNameFormOpen}
                saveName={saveName}
                onCancel={onEditNameCancel}
            />

            <Dropdown menu={{ items: userItems, onClick: userOptionsClick }} trigger={['click']} placement='bottomRight' className='user-dropdown-list'>
                {/* <p>User</p> */}
                <p>{name}</p>
                {/* user get using local storage */}
            </Dropdown>
        </>
    );
}

export default UserOptions;