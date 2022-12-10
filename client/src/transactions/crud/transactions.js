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

async function saveTransaction(formValues, setIsLoading, setSelectedTransaction, setTransactionFormOpen, setTransactions, setCategories) {
    setIsLoading(true)

    if (!formValues.recurring && formValues.remind_after_days) {
        formValues.remind_after_days = undefined
    }

    const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })

    const responseData = await response.json()

    if (responseData.message === 'Transaction added successfully') {
        setTransactions(responseData.transactions)

        setCategories(makeCategoriesArray(responseData.categories))

        setTransactionFormOpen(false)
        setSelectedTransaction({})

        setIsLoading(false)

        message.success('Transaction added')
    }
    else {
        setIsLoading(false)
        message.error(responseData.message)
    }
}

async function editTransaction(formValues, transactionId, setIsLoading, setSelectedTransaction, setTransactionFormOpen, setTransactions, setCategories) {
    setIsLoading(true)

    if (!formValues.recurring && formValues.remind_after_days) {
        formValues.remind_after_days = undefined
    }

    const response = await fetch('/api/transaction/' + transactionId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })

    const responseData = await response.json()

    if (responseData.message === 'Transaction added successfully'
        || responseData.message === 'Transaction updated successfully') {
        setTransactions(responseData.transactions)

        setCategories(makeCategoriesArray(responseData.categories))

        setTransactionFormOpen(false)
        setSelectedTransaction({})

        setIsLoading(false)

        message.success(responseData.message.replace('successfully', ''))
    }
    else {
        setIsLoading(false)
        message.error(responseData.message)
    }
}

async function deleteTransaction(record, setIsLoading, setSelectedTransaction, setTransactions, setCategories) {
    setIsLoading(true)

    const response = await fetch('/api/transaction/' + record._id, {
        method: 'DELETE'
    })

    const responseData = await response.json()

    if (responseData.message === 'Transaction deleted successfully') {
        setSelectedTransaction({})

        setTransactions(responseData.transactions)

        setCategories(makeCategoriesArray(responseData.categories))

        setIsLoading(false)

        message.success('Transaction deleted')
    }
    else {
        setIsLoading(false)
        message.error(responseData.message)
    }
}

export { getTransactions, saveTransaction, editTransaction, deleteTransaction }