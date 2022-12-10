import { Button, Segmented, Dropdown } from "antd";
import { FilterOutlined, FilterFilled, PlusOutlined, EditFilled, AreaChartOutlined, TableOutlined, /*, LineChartOutlined */ MoreOutlined } from "@ant-design/icons"
import AddEditTransaction from "./AddEditTransaction";
import EditCategory from "./EditCategory";
import FilterTransactions from "./FilterTransactions";
import { isEmpty } from "./transactions";

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

const transactionCategoryOptions = [
    {
        label: "Edit an existing category",
        key: 'edit-category',
        icon: <EditFilled />
    }
]

const defaultTransactionFormValues = {
    "title": null,
    "amount": null,
    "date": null,
    "type": null,
    "category": null,
    "description": null,
    "recurring": null,
    "remind_after_days": null
}

const defaultFilterFormValues = {
    "categories": null,
    "endAmount": null,
    "endDate": null,
    "recurring": null,
    "startAmount": null,
    "startDate": null,
    "type": null
}

const CRUDTransactionButtons = ({
    changeView,

    categories,

    selectedTransaction,
    transactionFormOpen,
    setTransactionFormOpen,
    addRecord,
    editRecord,
    onTransactionCancel,

    editCategoryFormOpen,
    setEditCategoryFormOpen,
    editCategory,
    onEditCategoryCancel,

    currentFilters,
    filterFormOpen,
    setFilterFormOpen,
    filterRecords,
    clearFilters,
    onFilterCancel,
}) => {
    function newTransactionButtonClick() { setTransactionFormOpen(true) }

    function categoryOptionsClick() { setEditCategoryFormOpen(true) }

    function filterButtonClick() { setFilterFormOpen(true) }

    return (
        <>
            <AddEditTransaction
                key={selectedTransaction._id ?? 'new-transaction'} /* very important, the feature works because of this */
                open={transactionFormOpen}
                categories={categories}
                initialValues={selectedTransaction ?? defaultTransactionFormValues}
                saveTransaction={!selectedTransaction._id ? addRecord : editRecord}
                onCancel={onTransactionCancel}
            />

            <EditCategory
                key='edit-category-form'
                open={editCategoryFormOpen}
                categories={categories}
                saveCategory={editCategory}
                onCancel={onEditCategoryCancel}
            />

            <FilterTransactions
                key='filter-form'
                open={filterFormOpen}
                categories={categories}
                initialValues={currentFilters ?? defaultFilterFormValues}
                applyFilters={filterRecords}
                clearFilters={clearFilters}
                onCancel={onFilterCancel}
            />

            <span>
                <Segmented
                    options={transactionViews}
                    // defaultValue='table'
                    size="large"
                    onChange={changeView}
                />

                <Button
                    size="large"
                    type='text'
                    icon={
                        isEmpty(currentFilters) ?
                            <FilterOutlined />
                            :
                            <FilterFilled />
                    }
                    onClick={filterButtonClick}
                />

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