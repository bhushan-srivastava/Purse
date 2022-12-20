import { Layout, List, Typography } from 'antd';
import logo from "../images/logo.png"
import CallToAction from '../components/CallToAction';
import newTransactionPicture from "../images/new.png"
import filter from "../images/filter.png"
import summary from "../images/summary.png"
import analysis from "../images/analysis.png"
import email from "../images/email.png"
import table from "../images/table.png"
import PurseBenefits from '../components/PurseBenefits';

const Welcome = () => {

    return (
        <Layout>
            <Layout.Header className='layout-header welcome'>
                <p className='title'>
                    <a href="/">
                        <img src={logo} className="logo" alt="Purse-logo" />
                        Purse
                    </a>
                </p>

                <CallToAction />
            </Layout.Header>

            <Layout.Content className='layout-content landing-content'>
                <List size='large'>
                    <List.Item>
                        <span>
                            <Typography.Title className='welcome-title'>Purse</Typography.Title>

                            <Typography.Title level={2}>Manage your cash money on the go and get your finances in order</Typography.Title>

                            <CallToAction />
                        </span>

                        <img src={newTransactionPicture} alt="new-transaction" />
                    </List.Item>

                    <List.Item>
                        <span>
                            <Typography.Title level={2}>Record your cash transactions.
                            </Typography.Title>

                            <Typography.Paragraph>
                                Track your income/expense and get helpful information about your financial habits.
                                Create, Read, Update and Delete income/expense records with details such as - Description, Category, Amount and Date.
                            </Typography.Paragraph>

                            <CallToAction />
                        </span>

                        <img src={newTransactionPicture} alt="new-transaction" />
                    </List.Item>

                    <List.Item>
                        <span>
                            <Typography.Title level={2}>Get a good idea of your financial behaviour using custom categories.
                            </Typography.Title>

                            <Typography.Paragraph>
                                Make your own categories for your transactions.
                                Understand categories where you possibly waste money and areas where you can cut back.
                                Understand which categories you earn from and areas where you save money.
                            </Typography.Paragraph>

                            <CallToAction />
                        </span>

                        <img src={table} alt="transaction-table" />
                    </List.Item>

                    <List.Item>
                        <img src={summary} alt="transaction-summary" />

                        <span>
                            <Typography.Title level={2}>See a category - wise comparison of your income/expenses.
                            </Typography.Title>

                            <Typography.Paragraph>
                                See how much have you earned/spent in each income/expense category.
                                See a visual analysis of your earning/spending patterns in each category.
                            </Typography.Paragraph>

                            <CallToAction />
                        </span>

                        <img src={analysis} alt="transaction-analysis" />
                    </List.Item>

                    <List.Item>
                        <span>
                            <Typography.Title level={2}>Filter and sort your income/expense records.
                            </Typography.Title>

                            <Typography.Paragraph>
                                Filter your income/expenses by - Category, Amount Range and Date Range.
                                Sort your income/expenses according to - Amount (low ↔ high) and Date (old ↔ new).
                            </Typography.Paragraph>

                            <CallToAction />
                        </span>

                        <img src={filter} alt="filter-transaction" />
                    </List.Item>

                    <List.Item>
                        <span>
                            <Typography.Title level={2}>Email reminder for recurring income/expenses.
                            </Typography.Title>

                            <Typography.Paragraph>
                                You can choose to get email reminders for recurring earnings such as salary, etc.
                                You can choose to get email reminders for recurring expenses such as cable/dish TV bill electricity bill, phone bill/recharge, Wi-Fi/broadband internet bill and the your household maid, nanny or cook's salary, etc.
                            </Typography.Paragraph>

                            <CallToAction />
                        </span>

                        <img src={email} alt="recurring-transaction-email-reminder" />
                    </List.Item>

                    <List.Item className='purse-benefits-container'>
                        <PurseBenefits />
                    </List.Item>
                </List>
            </Layout.Content >

            <Layout.Footer className='layout-footer'>
                <p className='title'>
                    <a href="/">
                        <img src={logo} className="logo" alt="Purse-logo" />
                        Purse
                    </a>
                </p>
            </Layout.Footer>
        </Layout >
    );
}

export default Welcome;