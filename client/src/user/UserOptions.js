import { Dropdown, message } from 'antd';
import { EditFilled, LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import EditName from './EditName';
import { useAuth } from '../auth/AuthContext';

const getNameFromCookie = () => {
    const purseCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('purseName='));

    return purseCookie ? decodeURIComponent(purseCookie.replace('purseName=', '')) : '';
};

const UserOptions = ({ setIsLoading }) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth();

    const [editNameFormOpen, setEditNameFormOpen] = useState(false)
    const [name, setName] = useState(user?.name || getNameFromCookie())

    useEffect(() => {
        setName(user?.name || getNameFromCookie());
    }, [user]);

    const saveName = async (formValues) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/user/name', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to update name');
            }
            setName(getNameFromCookie())
            message.success(responseData.message || 'Name saved')
        } catch (error) {
            message.error(error.message || 'Failed to update name');
        } finally {
            setIsLoading(false)
            setEditNameFormOpen(false)
        }
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
                key='edit-name-form'
                open={editNameFormOpen}
                initialValues={{ "newName": name }}
                // initialValues={{ "name": name }}
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
