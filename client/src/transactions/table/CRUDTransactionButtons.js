import { Button } from "antd";
import { FilterFilled, /* SortAscendingOutlined, */ PlusOutlined, EditFilled, AreaChartOutlined, TableOutlined /*, LineChartOutlined */ } from "@ant-design/icons"

const CRUDTransactionButtons = () => {
    return (
        <>
            <span>
                <Button size="large" type='text' icon={<FilterFilled />} />

                {/* <Button type='primary' icon={<SortAscendingOutlined />} /> */}

                <Button size="large" type='text' icon={<AreaChartOutlined />} />

                {/* <Button size='middle' type='primary' icon={<LineChartOutlined />} /> */}

                <Button size="large" type='text' icon={<TableOutlined />} />

                <Button size="large" type='text' icon={<EditFilled />} />
            </span>

            <span>
                <Button type='primary' icon={<PlusOutlined />} />
            </span>
        </>
    );
}

export default CRUDTransactionButtons;