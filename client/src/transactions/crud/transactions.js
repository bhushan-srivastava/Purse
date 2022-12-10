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

async function editTransactionCategory(formValues, setIsLoading, setEditCategoryFormOpen, setTransactions, setCategories) {
    setIsLoading(true)

    const response = await fetch('/api/transaction/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })

    const responseData = await response.json()

    if (responseData.message === 'Category updated successfully') {
        setTransactions(responseData.transactions)

        setCategories(makeCategoriesArray(responseData.categories))

        setEditCategoryFormOpen(false)

        setIsLoading(false)

        message.success('Category updated')
    }
    else {
        setIsLoading(false)
        message.error(responseData.message)
    }
}

const isEmpty = (ob) => {
    for (const key in ob) {
        return false
    }
    return true
}

async function filterTransactions(formValues, setIsLoading, setTransactions, setFilterFormOpen, setCurrentFilters) {
    setIsLoading(true) /******** maybe move loading to after if check */

    if (isEmpty(formValues)) {
        setIsLoading(false) /******** maybe move loading to after if check */
        return
    }

    const response = await fetch('/api/transaction/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })

    const responseData = await response.json()

    if (responseData.message === 'Filter transactions successful') {
        setTransactions(responseData.transactions)

        setFilterFormOpen(false)
        setCurrentFilters(formValues)

        setIsLoading(false)

        message.success('Filters applied')
    }
    else {
        setIsLoading(false)
        message.error(responseData.message)
    }
}

async function clearTransactionFilters(setIsLoading, setTransactions, setCategories, currentFilters, setCurrentFilters, setFilterFormOpen) {
    setIsLoading(true) /******** maybe remove loading state from this function */

    setFilterFormOpen(false)

    if (isEmpty(currentFilters)) {
        setIsLoading(false) /******** maybe remove loading state from this function */
        return
    }

    setCurrentFilters({})

    await getTransactions(setIsLoading, setTransactions, setCategories)

    // if you don't want the function to be async
    // getTransactions(setIsLoading, setTransactions, setCategories)
}

export { getTransactions, saveTransaction, editTransaction, deleteTransaction, editTransactionCategory, filterTransactions, clearTransactionFilters, isEmpty }