import DefaultLayout from "../default_layout/DefaultLayout";
import TransactionsTable from "./table/TransactionsTable";

const Home = () => {
    return (
        <DefaultLayout>
            Transactions
            {/* table ? send table : send graph */}
            <TransactionsTable />
        </DefaultLayout>
    );
}

export default Home;