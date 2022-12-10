import { Modal, Form, Button, InputNumber, DatePicker, Radio, Typography, Select } from 'antd'

const FilterTransactions = ({ open, categories, initialValues, applyFilters, clearFilters, onCancel }) => {
    return (
        <Modal
            open={open}
            title={<Typography.Title level={2}>Filter Transactions</Typography.Title>}
            onCancel={onCancel}
            footer={false}
        >
            <Form
                name="filter-form"
                initialValues={initialValues}
                onFinish={applyFilters}
            >
                <span className='range-filter'>
                    <Form.Item name="startDate">
                        <DatePicker
                            size='large'
                            format='DD MMM YYYY'
                            placeholder='From date'
                        />
                    </Form.Item>

                    <Form.Item name="endDate">
                        <DatePicker
                            size='large'
                            format='DD MMM YYYY'
                            placeholder='To date'
                        />
                    </Form.Item>
                </span>

                <span className='range-filter'>
                    <Form.Item name="startAmount">
                        <InputNumber
                            size='large'
                            placeholder="From amount"
                            min={0}
                            className='ant-input-number-full-width'
                        />
                    </Form.Item>

                    <Form.Item name="endAmount">
                        <InputNumber
                            size='large'
                            placeholder="To amount"
                            min={0}
                            className='ant-input-number-full-width'
                        />
                    </Form.Item>
                </span>

                <Form.Item name="type">
                    <Radio.Group
                        size='large'
                        optionType='button'
                        buttonStyle='solid'
                        name='transaction-type'
                    >
                        <Radio.Button value='Spent'>Spent</Radio.Button>
                        <Radio.Button value='Earned'>Earned</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="categories">
                    <Select
                        allowClear={true}
                        showSearch={true}
                        placeholder='Categories'
                        mode="multiple"
                        maxTagCount={2}
                        // maxTagTextLength={2}
                        options={categories}
                        size='large'
                        // allowClear={true}
                        filterOption={true}
                    />
                </Form.Item>

                <Form.Item name="recurring">
                    <Radio.Group
                        size='large'
                        optionType='button'
                        buttonStyle='solid'
                        name='recurring-type'
                    >
                        <Radio.Button value={true}>Recurring</Radio.Button>
                        <Radio.Button value={false}>Not Recurring</Radio.Button>
                        {/* <Radio.Button value='true'>Recurring</Radio.Button>
                        <Radio.Button value='false'>Not Recurring</Radio.Button> */}
                    </Radio.Group>
                </Form.Item>

                <Form.Item className='modal-submit-button'>
                    <Button htmlType="reset" size='large' onClick={clearFilters}>
                        Clear Filters
                    </Button>

                    <Button type="primary" htmlType="submit" size='large'>
                        Apply Filters
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FilterTransactions