import { Table, Button, Popconfirm } from "antd";
import { EditFilled, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import moment from 'moment'

const TransactionsTable = ({
    transactions,
    setSelectedTransaction,
    setTransactionFormOpen,
    deleteRecord }) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => new Date(date).toDateString().substring(4),
            defaultSortOrder: 'descend', // has to be outside of sorter object
            sorter: {
                compare: (record1, record2) => new Date(record1.date) - new Date(record2.date),
            }
        },
        {
            title: 'Amt',
            dataIndex: 'amount',
            sorter: {
                compare: (record1, record2) => record1.amount - record2.amount,
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <span className="action-span">
                        <Button
                            type='text'
                            icon={<EditFilled />}
                            onClick={() => {
                                // see if you want a named function here, like some local editRecord(record) or something
                                const tempRecord = record
                                tempRecord.date = moment(record.date)
                                if (tempRecord.remind_on) {
                                    tempRecord.remind_on = moment(record.remind_on)
                                }
                                setSelectedTransaction(tempRecord)
                                // setSelectedTransaction(record)
                                setTransactionFormOpen(true)
                            }}
                        />

                        <Popconfirm
                            title={"Delete?"}
                            okText="Yes"
                            cancelText="No"
                            icon={<QuestionCircleOutlined />}
                            okButtonProps={{ danger: true, type: "default" }}
                            onConfirm={() => { deleteRecord(record) }}
                        // onCancel={() => { message.error("error") }}
                        >
                            <Button type='text' danger={true} icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </span>
                )
            }
        }
    ]

    // const saveTransaction = () => { setTransactionFormOpen(false) }

    // const onCancel = () => {
    //     setSelectedTransaction({})
    //     setTransactionFormOpen(false)
    // }

    return (
        <>
            <Table
                className="transactions-table"
                size="small"
                rowKey="_id"
                bordered={true}
                dataSource={transactions}
                columns={columns}
                pagination={{ pageSize: 5 }}
                showSorterTooltip={false}
                expandedRowRender={
                    (record) => {
                        return (
                            <span>
                                Title: {record.title},
                                <br />
                                Category: {record.category[0].toUpperCase() + record.category.substring(1)},
                                <br />
                                Recurring: {record.recurring ? "Yes" : "No"},
                                <br />
                                Remind on: {record.recurring && record.remind_on ? new Date(record.remind_on).toDateString()/*.substring(4)*/ : "NA"},
                                <br />
                                Description: {record.description ? record.description : "NA"}
                            </span>
                        )
                    }
                }
            />
        </>
    );
}

export default TransactionsTable;