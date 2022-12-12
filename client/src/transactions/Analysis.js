import TransactionSummary from "./tables/TransactionSummary";
import SpendingsPieChart from "./graphs/SpendingsPieChart";
import EarningsPieChart from "./graphs/EarningsPieChart";
import TransactionsBarChart from "./graphs/TransactionsBarChart";
import { List, Skeleton } from "antd";
import { useEffect, useState } from "react";

const getAnalysis = async (filters) => {
    const response = await fetch('/api/transaction/analysis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    })

    const responseData = await response.json()

    return responseData
}

const Analysis = ({ filters }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [graphData, setGraphData] = useState({})

    useEffect(() => {
        setIsLoading(true)

        getAnalysis(filters)
            .then((responseData) => {
                setTableData(responseData.tableData)
                setGraphData(responseData.graphData)

                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
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

    return (
        isLoading ?
            <div className='skeleton-image-loader'>
                <Skeleton.Image active={true} />
            </div>
            :
            <List
                size="large"
                // bordered={true}
                pagination={{ size: 'small', pageSize: 1, defaultCurrent: 1 }}
                dataSource={tableData?.length !== 0 || graphData?.length !== 0 ? dataSource : []}
                renderItem={(item) => <List.Item>{item.render()}</List.Item>}
            />
    );
}

export default Analysis;