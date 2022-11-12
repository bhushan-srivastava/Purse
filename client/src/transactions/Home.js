import DefaultLayout from "../default_layout/DefaultLayout";
import { Table } from "antd"

const dataSource = [
    {
        key: 1,
        date: new Date().toDateString().substring(4),
        amount: 123,
        title: "title1",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "yes"
    },
    {
        key: 2,
        date: new Date().toDateString().substring(4),
        amount: 456,
        title: "title2",
        type: "earned",
        category: "some category",
        description: "some description",
        recurring: "yes"
    },
    {
        key: 3,
        date: new Date().toDateString().substring(4),
        amount: 789,
        title: "title3",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "no"
    },
    {
        key: 4,
        date: new Date().toDateString().substring(4),
        amount: 10111,
        title: "title4",
        type: "earned",
        category: "some category",
        description: "some description",
        recurring: "no"
    },
    {
        key: 5,
        date: new Date().toDateString().substring(4),
        amount: 13141,
        title: "title5",
        type: "spent",
        category: "some category",
        description: "some description",
        recurring: "yes"
    },
]

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Amt',
        dataIndex: 'amount',
        key: 'amount'
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

const table = (
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
                        Description: {record.description ? record.description : "NA"},
                    </span>
                )
            }
        }
    />
)

const Home = () => {
    return (
        <DefaultLayout>
            Transactions
            {/* if table ? render table : render graph */}
            {table}
            graph
        </DefaultLayout>
    );
}

export default Home;