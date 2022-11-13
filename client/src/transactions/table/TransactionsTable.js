import { Table } from "antd";

const dataSource = [
    {
        key: 1,
        date: new Date("Nov 07 2022").toDateString().substring(4),
        amount: 123,
        title: "title1",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "yes",
        remind_after_days: 1
    },
    {
        key: 2,
        date: new Date("Nov 08 2022").toDateString().substring(4),
        amount: 456,
        title: "title2",
        type: "earned",
        category: "some category",
        description: "some description",
        recurring: "yes",
        remind_after_days: 2
    },
    {
        key: 3,
        date: new Date("Nov 09 2022").toDateString().substring(4),
        amount: 789,
        title: "title3",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "no",
        remind_after_days: 3
    },
    {
        key: 4,
        date: new Date("Nov 10 2022").toDateString().substring(4),
        amount: 10111,
        title: "title4",
        type: "earned",
        category: "some category",
        description: "some description",
        recurring: "no",
        remind_after_days: 4
    },
    {
        key: 5,
        date: new Date("Nov 11 2022").toDateString().substring(4),
        amount: 13141,
        title: "title5",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "yes",
        remind_after_days: 5
    },
]

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: {
            compare: (record1, record2) => { return (new Date(record1.date) - new Date(record2.date)) },
            multiple: 2
        }
    },
    {
        title: 'Amt',
        dataIndex: 'amount',
        key: 'amount',
        sorter: {
            compare: (record1, record2) => { return (record1.amount - record2.amount) },
            multiple: 1
        }
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'Action',

        key: 'actions',
    }
]

const TransactionsTable = () => {
    return (
        <Table
            className="transactions-table"
            size="small"
            bordered={true}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
            expandedRowRender={
                (record) => {
                    return (
                        <span>
                            Title: {record.title},
                            <br />
                            Category: {record.category},
                            <br />
                            Recurring: {record.recurring ? "yes" : "no"},
                            <br />
                            Remind every: {record.remind_after_days} days,
                            <br />
                            Description: {record.description ? record.description : "NA"}
                        </span>
                    )
                }
            }
        />
    );
}

export default TransactionsTable;