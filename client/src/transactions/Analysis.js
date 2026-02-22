import TransactionSummary from "./tables/TransactionSummary";
import SpendingsPieChart from "./graphs/SpendingsPieChart";
import EarningsPieChart from "./graphs/EarningsPieChart";
import TransactionsBarChart from "./graphs/TransactionsBarChart";
import { Alert, List, Skeleton } from "antd";
import { useEffect, useState } from "react";

const Analysis = ({ filters }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [graphData, setGraphData] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAnalysis = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch('/api/transaction/analysis', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filters || {})
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to fetch analysis');
                }
                setTableData(responseData.tableData)
                setGraphData(responseData.graphData)
            } catch (fetchError) {
                setTableData([])
                setGraphData({})
                setError(fetchError.message || 'Failed to fetch analysis')
            } finally {
                setIsLoading(false)
            }
        };

        fetchAnalysis();
    }, [filters])

    const tables = [
        {
            key: 'transactions-summary-table',
            render: () => <TransactionSummary data={tableData} />
        }
    ]

    const graphs = [
        {
            key: 'transactions-line-chart',
            render: () => <SpendingsPieChart data={graphData} />
        },
        {
            key: 'transactions-pie-chart',
            render: () => <EarningsPieChart data={graphData} />
        },
        {
            key: 'transactions-bar-chart',
            render: () => <TransactionsBarChart data={graphData} />
        }
    ]

    const dataSource = [...tables, ...graphs]

    if (isLoading) {
        return (
            <div className='skeleton-image-loader'>
                <Skeleton.Image active={true} />
            </div>
        );
    }

    return (
        <>
            {error ? <Alert message="Error" description={error} type="error" showIcon /> : null}
            <List
                size="large"
                pagination={{ size: 'small', pageSize: 1, defaultCurrent: 1 }}
                dataSource={tableData?.length !== 0 || graphData?.length !== 0 ? dataSource : []}
                renderItem={(item) => <List.Item>{item.render()}</List.Item>}
            />
        </>
    );
}

export default Analysis;
