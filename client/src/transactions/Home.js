import { Layout, Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react';
import logo from "../static/images/logo.png"
import { getTransactions, deleteTransaction, editTransaction, saveTransaction, editTransactionCategory, clearTransactionFilters, filterTransactions, makeCategoriesArray } from "./crud/transactions"
import Analysis from './Analysis';
import CRUDTransactionButtons from './crud/CRUDTransactionButtons';
import TransactionsTable from './tables/TransactionsTable';
import UserOptions from '../user/UserOptions';

const Home = () => {
    /** STATES */
    const [isLoading, setIsLoading] = useState(true)

    const [view, setView] = useState('table')

    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])

    const [selectedTransaction, setSelectedTransaction] = useState({})
    const [transactionFormOpen, setTransactionFormOpen] = useState(false)

    const [editCategoryFormOpen, setEditCategoryFormOpen] = useState(false)

    const [currentFilters, setCurrentFilters] = useState({})
    const [filterFormOpen, setFilterFormOpen] = useState(false)

    /** CRUD CALLER FUNCTIONS */
    useEffect(() => {
        setIsLoading(true)

        getTransactions()
            .then((responseData) => {
                setTransactions(responseData.transactions)

                setCategories(makeCategoriesArray(responseData.categories))

                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
    }, [])

    function addRecord(record) {
        saveTransaction(record, setIsLoading, setSelectedTransaction, setTransactionFormOpen, setTransactions, setCategories)
    }

    function editRecord(record) {
        editTransaction(record, selectedTransaction._id, setIsLoading, setSelectedTransaction, setTransactionFormOpen, setTransactions, setCategories)
    }

    const closeTransactionForm = () => {
        setSelectedTransaction({}) /********* very important, feature works because of this */
        setTransactionFormOpen(false)
    }

    function deleteRecord(record) {
        deleteTransaction(record, setIsLoading, setSelectedTransaction, setTransactions, setCategories)
    }

    function editCategory(formValues) {
        editTransactionCategory(formValues, setIsLoading, setEditCategoryFormOpen, setTransactions, setCategories)
    }

    const closeEditCategoryForm = () => {
        setEditCategoryFormOpen(false)
    }

    function filterRecords(formValues) {
        filterTransactions(formValues, setIsLoading, setTransactions, setFilterFormOpen, setCurrentFilters)
    }

    function clearFilters() {
        clearTransactionFilters(setIsLoading, setTransactions, setCategories, currentFilters, setCurrentFilters, setFilterFormOpen)
    }

    function closeFilterForm() {
        setFilterFormOpen(false)
    }

    const renderView = () => {
        if (view === 'table' && isLoading) {
            return (
                <Skeleton
                    title={false}
                    paragraph={{ rows: 10, width: '100%' }}
                    active={true}
                />
            )
        }
        else if (view === 'table' && !isLoading) {
            return (<TransactionsTable
                transactions={transactions}
                setSelectedTransaction={setSelectedTransaction}
                setTransactionFormOpen={setTransactionFormOpen}
                deleteRecord={deleteRecord}
            />)
        }
        else if (view === 'analysis' && isLoading) {
            return (
                <div className='skeleton-image-loader'>
                    <Skeleton.Image active={true} />
                </div>
            )
        }
        else if (view === 'analysis' && !isLoading) {
            return <Analysis filters={currentFilters} />
        }
    }

    return (
        <Layout>
            <Layout.Header className='layout-header'>
                <p className='title'>
                    <a href="/">
                        <img src={logo} className="logo" alt="Purse-logo" />
                        Purse
                    </a>
                </p>

                <UserOptions setIsLoading={setIsLoading} />
            </Layout.Header>

            <Layout.Content className='layout-content'>

                <Layout className='main-content-layout'>
                    <Typography.Title>
                        {
                            isLoading ?
                                <Skeleton.Input
                                    active={true}
                                    size='large'
                                    block={true}
                                />
                                :
                                view === 'table' ? "Transactions" : "Analysis"
                        }
                    </Typography.Title>

                    <Layout.Header className='layout-header'>
                        {
                            isLoading ?
                                <>
                                    <Skeleton.Button active={true} />
                                    <Skeleton.Button active={true} />
                                    <Skeleton.Button active={true} />
                                    <Skeleton.Button active={true} />
                                </>
                                :
                                <CRUDTransactionButtons
                                    changeView={setView}

                                    categories={categories}

                                    selectedTransaction={selectedTransaction}
                                    transactionFormOpen={transactionFormOpen}
                                    setTransactionFormOpen={setTransactionFormOpen}
                                    addRecord={addRecord}
                                    editRecord={editRecord}
                                    onTransactionCancel={closeTransactionForm}

                                    editCategoryFormOpen={editCategoryFormOpen}
                                    setEditCategoryFormOpen={setEditCategoryFormOpen}
                                    editCategory={editCategory}
                                    onEditCategoryCancel={closeEditCategoryForm}

                                    currentFilters={currentFilters}
                                    filterFormOpen={filterFormOpen}
                                    setFilterFormOpen={setFilterFormOpen}
                                    filterRecords={filterRecords}
                                    clearFilters={clearFilters}
                                    onFilterCancel={closeFilterForm}
                                />
                        }
                    </Layout.Header>

                    <Layout.Content>
                        {renderView()}
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
}

export default Home;