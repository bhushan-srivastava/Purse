import { message } from "antd"

function makeCategoriesArray(rawCategories) {
    const arr = []

    for (const i of rawCategories) {
        arr.push({
            value: i,
            label: i[0].toUpperCase() + i.substring(1)
        })
    }

    return arr
}

async function getTransactions(setIsLoading, setTransactions, setCategories) {
    setIsLoading(true)

    const response = await fetch('/api/transaction', {
        method: 'GET'
    })

    const responseData = await response.json()

    setTransactions(responseData.transactions)

    setCategories(makeCategoriesArray(responseData.categories))

    setIsLoading(false)
}

export { getTransactions }