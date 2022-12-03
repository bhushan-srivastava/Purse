import { Mix } from "@ant-design/plots"
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

const data = {
    "pie1": [
        {
            "area": "华东",
            "bill": 4588,
            "sale": 7924453
        },
        {
            "area": "中南",
            "bill": 4205,
            "sale": 6715442
        },
        {
            "area": "东北",
            "bill": 2598,
            "sale": 4074576
        },
        {
            "area": "华北",
            "bill": 2148,
            "sale": 3614068
        },
        {
            "area": "西南",
            "bill": 1763,
            "sale": 2879904
        },
        {
            "area": "西北",
            "bill": 974,
            "sale": 1690889
        },
        {
            "area": "华南",
            "bill": 1074,
            "sale": 1690889
        }
    ],
    "pie2": [
        {
            "time": "2016季1",
            "area": "华东",
            "value": 28477
        },
        {
            "time": "2016季1",
            "area": "中南",
            "value": 7700
        },
        {
            "time": "2016季1",
            "area": "东北",
            "value": 5526
        },
        {
            "time": "2016季1",
            "area": "华北",
            "value": 9014
        },
        {
            "time": "2016季1",
            "area": "西南",
            "value": 14907
        },
        {
            "time": "2016季1",
            "area": "西北",
            "value": 42752
        }
    ]
}

const config = {
    // 关闭 chart 上的 tooltip，子 view 开启 tooltip
    tooltip: false,
    legend: true,
    plots: [
        {
            type: 'pie',
            region: {
                start: {
                    x: 0,
                    y: 0,
                },
                end: {
                    x: 0.45,
                    y: 1,
                },
            },
            options: {
                data: data.pie1,
                angleField: 'bill',
                colorField: 'area',
                radius: 0.85,
                tooltip: {
                    showMarkers: false,
                },
                label: {
                    type: 'inner',
                    offset: '-15%',
                },
                interactions: [
                    {
                        type: 'element-active',
                    },
                    {
                        type: 'association-tooltip',
                    },
                    {
                        type: 'association-highlight',
                    },
                ],
            },
        },
        {
            type: 'pie',
            region: {
                start: {
                    x: 0.55,
                    y: 0,
                },
                end: {
                    x: 1,
                    y: 1,
                },
            },
            options: {
                data: data.pie2,
                radius: 0.85,
                angleField: 'value',
                colorField: 'area',
                label: {
                    type: 'inner',
                    offset: '-15%',
                },
                tooltip: {
                    showMarkers: false,
                },
                interactions: [
                    {
                        type: 'association-tooltip',
                    },
                    {
                        type: 'association-selected',
                    },
                ],
            },
        },
    ],
};

const TransactionsPieChart = () => {
    return (
        <>
            <span className="transactions-graph-title">
                <Typography.Title level={4}>Income/Expense Pie Chart</Typography.Title>

                <Button type='text' icon={<DownloadOutlined />}></Button>
            </span>

            <Mix {...config} />
        </>
    );
}

export default TransactionsPieChart;