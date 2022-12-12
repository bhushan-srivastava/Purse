import { Empty, Typography } from "antd";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getRandomBackgroundColors } from "./graphHelper";

Chart.register(ArcElement, Tooltip, Legend);
Chart.defaults.font.size = 16
Chart.defaults.plugins.legend.align = 'start'

const SpendingsPieChart = ({ data }) => {
    if (data.categories.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    const backgroundColors = getRandomBackgroundColors(data.categories)

    const pieChartData = {
        labels: data.categories,
        datasets: [
            {
                label: 'Spent',
                data: data.spent,
                backgroundColor: backgroundColors
            }
        ],
    }


    return (
        <div className="analysis-container" >
            <Typography.Title level={4}>Spendings Pie Chart</Typography.Title>

            <Pie data={pieChartData} />
        </div >
    );
}

export default SpendingsPieChart;