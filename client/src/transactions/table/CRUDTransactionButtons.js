import { Button } from "antd";
import { FilterFilled, SortAscendingOutlined, PlusOutlined, EditFilled, AreaChartOutlined, TableOutlined /*, LineChartOutlined */ } from "@ant-design/icons"

const CRUDTransactionButtons = () => {
    return (
        <>
            <Button type='primary' icon={<FilterFilled />} />

            <Button type='primary' icon={<SortAscendingOutlined />} />

            <Button type='primary' icon={<AreaChartOutlined />} />

            {/* <Button size='middle' type='primary' icon={<LineChartOutlined />} /> */}

            <Button type='primary' icon={<TableOutlined />} />

            <Button type='primary' icon={<EditFilled />}></Button>

            <Button type='primary' icon={<PlusOutlined />} />
        </>
    );
}

export default CRUDTransactionButtons;