import { Button, Segmented, Dropdown } from "antd";
import { FilterFilled, PlusOutlined, EditFilled, AreaChartOutlined, TableOutlined, /*, LineChartOutlined */ MoreOutlined } from "@ant-design/icons"
import { useState } from "react";
import AddEditTransaction from "./AddEditTransaction";
import EditCategory from "./EditCategory";
import FilterTransactions from "./FilterTransactions";

const transactionCategoryOptions = [
    {
        label: "Edit an existing category",
        key: 'edit-category',
        icon: <EditFilled />
    }
]

const transactionViews = [
    {
        value: 'table',
        icon: <TableOutlined />,
    },
    {
        value: 'graph',
        icon: <AreaChartOutlined />,
    }
]

function changeView(value) { }

const CRUDTransactionButtons = () => {
    const [transactionFormOpen, setTransactionFormOpen] = useState(false)
    function newTransactionButtonClick() { setTransactionFormOpen(true) }
    const saveTransaction = () => { setTransactionFormOpen(false) }
    const onTransactionCancel = () => { setTransactionFormOpen(false) }

    const [editCategoryFormOpen, setEditCategoryFormOpen] = useState(false)
    function categoryOptionsClick() { setEditCategoryFormOpen(true) }
    const saveCategory = () => { setEditCategoryFormOpen(false) }
    function onEditCategoryCancel() { setEditCategoryFormOpen(false) }

    const [filterFormOpen, setFilterFormOpen] = useState(false)
    function filterButtonClick() { setFilterFormOpen(true) }
    const applyFilters = () => { setFilterFormOpen(false) }
    const clearFilters = () => { setFilterFormOpen(false) }
    const onFilterCancel = () => { setFilterFormOpen(false) }

    return (
        <>
            <AddEditTransaction
                open={transactionFormOpen}
                saveTransaction={saveTransaction}
                onCancel={onTransactionCancel}
            />

            <EditCategory
                open={editCategoryFormOpen}
                saveCategory={saveCategory}
                onCancel={onEditCategoryCancel}
            />

            <FilterTransactions
                open={filterFormOpen}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                onCancel={onFilterCancel}
            />

            <span>
                {/* <Button type='primary' icon={<SortAscendingOutlined />} /> */}

                {/* <Button size="large" type='text' icon={<AreaChartOutlined />} /> */}

                {/* <Button size='middle' type='primary' icon={<LineChartOutlined />} /> */}

                {/* <Button size="large" type='text' icon={<TableOutlined />} /> */}

                <Segmented
                    options={transactionViews}
                    defaultValue='table'
                    size="large"
                    onChange={changeView}
                />

                <Button size="large" type='text' icon={<FilterFilled />} onClick={filterButtonClick} />

                <Dropdown menu={{ items: transactionCategoryOptions, onClick: categoryOptionsClick }} trigger={['click']} placement='bottomRight' className='category-dropdown-list' >
                    <Button size="large" type='text' icon={<MoreOutlined rotate={90} />} />
                </Dropdown>
            </span>

            <span>
                <Button type='primary' icon={<PlusOutlined />} onClick={newTransactionButtonClick} />
            </span>
        </>
    );
}

export default CRUDTransactionButtons;