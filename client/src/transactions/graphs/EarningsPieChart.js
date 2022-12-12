import { Empty, Typography } from "antd";

const EarningsPieChart = ({ data }) => {
    if (data.categories.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    return (
        <div className="analysis-container">
            <Typography.Title level={4}>Earnings Pie Chart</Typography.Title>
        </div>
    );
}

export default EarningsPieChart;