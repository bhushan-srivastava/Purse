import { message } from "antd"

export default async function logout() {
    const response = await fetch('/api/auth/logout', {
        method: 'GET'
    })

    const responseData = await response.json()

    if (responseData.message === 'Logout successful') {
        message.success(responseData.message)
        // navigate("/welcome")
    }
    else {
        message.error(responseData.message)
    }
}