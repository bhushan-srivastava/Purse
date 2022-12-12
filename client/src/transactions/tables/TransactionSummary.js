import { Table, Typography } from "antd";

const TransactionSummary = ({ data }) => {
    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => category[0].toUpperCase() + category.substring(1)
        },
        {
            title: 'Spent',
            dataIndex: 'spent',
            sorter: {
                compare: (record1, record2) => record1.spent - record2.spent,
            },
            className: 'red-color'
        },
        {
            title: 'Earned',
            dataIndex: 'earned',
            sorter: {
                compare: (record1, record2) => record1.earned - record2.earned,
            },
            className: 'green-color'
        }
    ]

    return (
        <div className="analysis-container">
            <Typography.Title level={4}>Category - wise Summary</Typography.Title>

            <Table
                className="transaction-summary-table"
                size="small"
                rowKey="category"
                bordered={true}
                dataSource={data}
                columns={columns}
                pagination={{ pageSize: 5 }}
                showSorterTooltip={false}
            />
        </div>
    );
}

export default TransactionSummary;