import TransactionsPieChart from "./TransactionsPieChart";
import TransactionsBarChart from "./TransactionsBarChart";
import TransactionsLineChart from "./TransactionsLineChart";
import { List } from "antd";

const Visualization = ({ transactions }) => {
    const graphs = [
        {
            key: 'transactions-pie-chart',
            render: () => <TransactionsPieChart transactions={transactions} />
        },
        {
            key: 'transactions-bar-chart',
            render: () => <TransactionsBarChart transactions={transactions} />
        },
        {
            key: 'transactions-line-chart',
            render: () => <TransactionsLineChart transactions={transactions} />
        }
    ]

    return (
        <List
            size="large"
            pagination={{ size: 'small', pageSize: 1, defaultCurrent: 1 }}
            dataSource={transactions.length !== 0 ? graphs : []}
            renderItem={(graph) => <List.Item>{graph.render()}</List.Item>}
        />
    );
}

export default Visualization;