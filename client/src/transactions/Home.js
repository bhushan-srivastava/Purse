import { Layout, Skeleton, Typography, Pagination, Alert, message } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import logo from "../static/images/logo.png"
import Analysis from './Analysis';
import CRUDTransactionButtons from './crud/CRUDTransactionButtons';
import TransactionsTable from './tables/TransactionsTable';
import UserOptions from '../user/UserOptions';
import { isEmpty } from './crud/transactions';

// const parseJson = async (response) => {
//     const contentType = response.headers.get('content-type') || '';
//     if (contentType.includes('application/json')) {
//         return response.json();
//     }
//     return {};
// };

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('table');

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [transactionFormOpen, setTransactionFormOpen] = useState(false);
    const [editCategoryFormOpen, setEditCategoryFormOpen] = useState(false);
    const [currentFilters, setCurrentFilters] = useState({});
    const [filterFormOpen, setFilterFormOpen] = useState(false);

    const fetchData = useCallback(async (page, pageSize) => {
        setIsLoading(true);
        setError(null);
        try {
            const query = new URLSearchParams({ page: String(page), limit: String(pageSize) });
            const response = await fetch(`/api/transaction?${query.toString()}`, {
                credentials: 'include'
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to fetch transactions.');
            }
            const { data, total, categories: fetchedCategories } = responseData;
            
            setTransactions(data);
            setCategories(fetchedCategories.map(cat => ({ label: cat, value: cat }))); 
            setPagination({ current: page, pageSize, total });

        } catch (err) {
            setError(err.message || 'Failed to fetch transactions.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchData(1, 10);
    }, [fetchData]);

    async function addRecord(record) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/transaction', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add transaction.');
            }
            message.success('Transaction added successfully');
            setCurrentFilters({});
            fetchData(1, pagination.pageSize);
        } catch (error) {
            setError(error.message || 'Failed to add transaction.');
            setIsLoading(false);
        } finally {
            setTransactionFormOpen(false);
            setSelectedTransaction({});
        }
    }

    async function editRecord(record) {
        const originalTransactions = [...transactions];
        const updatedTransactions = originalTransactions.map(t => 
            t._id === selectedTransaction._id ? { ...t, ...record } : t
        );
        
        setTransactions(updatedTransactions);
        setTransactionFormOpen(false);
        setSelectedTransaction({});

        try {
            const response = await fetch(`/api/transaction/${selectedTransaction._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to update transaction.');
            }
            message.success('Transaction updated');
            refreshCurrentView();
        } catch (error) {
            message.error(error.message || 'Failed to update transaction.');
            setTransactions(originalTransactions);
        }
    }

    async function deleteRecord(record) {
        const originalTransactions = [...transactions];
        setTransactions(originalTransactions.filter(t => t._id !== record._id));

        try {
            const response = await fetch(`/api/transaction/${record._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to delete transaction.');
            }
            message.success('Transaction deleted');
            refreshCurrentView();
        } catch (error) {
            message.error(error.message || 'Failed to delete transaction.');
            setTransactions(originalTransactions);
        }
    }

    const closeTransactionForm = () => {
        setSelectedTransaction({})
        setTransactionFormOpen(false)
    }

    async function editCategory(formValues) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/transaction/category', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to update category.');
            }
            message.success('Category updated');
            setEditCategoryFormOpen(false);
            setCurrentFilters({});
            await fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            setError(error.message || 'Failed to update category.');
            setIsLoading(false);
        }
    }
    const closeEditCategoryForm = () => {
        setEditCategoryFormOpen(false)
    }
    async function filterRecords(formValues) {
        await fetchFilteredData(formValues, 1, pagination.pageSize, true);
    }

    async function fetchFilteredData(formValues, page, pageSize, closeFilterModal) {
        setIsLoading(true);
        setError(null);
        try {
            const payload = { ...formValues, page, limit: pageSize };
            const response = await fetch('/api/transaction/filter', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to filter transactions.');
            }
            const filteredTransactions = responseData.transactions || [];
            setCurrentFilters(formValues || {});
            setTransactions(filteredTransactions);
            setPagination({
                current: responseData.page || page,
                pageSize: responseData.limit || pageSize,
                total: responseData.total || 0
            });
            if (closeFilterModal) {
                setFilterFormOpen(false);
            }
        } catch (error) {
            setError(error.message || 'Failed to filter transactions.');
        } finally {
            setIsLoading(false);
        }
    }
    function clearFilters() {
        setCurrentFilters({});
        setError(null);
        setFilterFormOpen(false);
        fetchData(1, pagination.pageSize);
    }
    function closeFilterForm() {
        setFilterFormOpen(false)
    }

    function refreshCurrentView() {
        if (isEmpty(currentFilters)) {
            fetchData(pagination.current, pagination.pageSize);
            return;
        }
        fetchFilteredData(currentFilters, pagination.current, pagination.pageSize, false);
    }

    const handlePageChange = (page, pageSize) => {
        if (isEmpty(currentFilters)) {
            fetchData(page, pageSize);
            return;
        }
        fetchFilteredData(currentFilters, page, pageSize, false);
    };

    const renderView = () => {
        if (view === 'table' && isLoading && transactions.length === 0) {
            return <Skeleton title={false} paragraph={{ rows: 10, width: '100%' }} active={true} />;
        }
        if (view === 'table') {
            return (
                <>
                    {error && <Alert message="Error" description={error} type="error" showIcon closable />}
                    <TransactionsTable
                        transactions={transactions}
                        setSelectedTransaction={setSelectedTransaction}
                        setTransactionFormOpen={setTransactionFormOpen}
                        deleteRecord={deleteRecord}
                    />
                    <Pagination
                        style={{ marginTop: '20px', textAlign: 'center' }}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </>
            );
        }
        if (view === 'analysis') {
            return <Analysis filters={currentFilters} />;
        }
        return null;
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
                        {view === 'table' ? "Transactions" : "Analysis"}
                    </Typography.Title>
                    <Layout.Header className='layout-header'>
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
