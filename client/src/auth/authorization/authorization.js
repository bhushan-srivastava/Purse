export default async function getAuth() {
    try {
        const response = await fetch('/api/auth', {
            method: 'GET'
        })

        const responseData = await response.json()

        if (responseData.message === 'Authorized') {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        console.log(error);
        return false
    }
}