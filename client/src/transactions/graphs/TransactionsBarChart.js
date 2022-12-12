import { Empty, Typography } from "antd";
import { RotateLeftOutlined } from "@ant-design/icons"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Chart.defaults.font.size = 16

const TransactionsBarChart = ({ data }) => {
    if (data.categories.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    const config = {
        // type: 'bar',
        // barChartData,
        indexAxis: 'y',
    };

    const barChartData = {
        labels: data.categories,
        datasets: [
            {
                axis: 'y',
                label: 'Spent',
                data: data.spent,
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                axis: 'y',
                label: 'Earned',
                data: data.earned,
                backgroundColor: 'rgb(126, 198, 153)'
            }
        ]
    };

    return (
        <>
            <Typography.Title level={4}>Spendings and Earnings Bar Chart</Typography.Title>

            <div className='rotate-device'>
                <RotateLeftOutlined rotate={270} className='icon' />

                <Typography.Title level={4}>Please rotate your device</Typography.Title>
            </div>

            <div className="bar-chart">
                <Bar options={config} data={barChartData} />
            </div>
        </>
    );
}

export default TransactionsBarChart;