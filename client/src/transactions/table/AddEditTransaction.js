import { Modal, Form, Button, Input, InputNumber, DatePicker, Radio, Typography, AutoComplete } from 'antd'

const transactionCategories = [
    {
        value: "abcd",
        label: "abcd"
    },
    {
        value: "cdef",
        label: "cdef"
    }
]

const AddEditTransaction = ({ open, editData, saveTransaction, onCancel }) => {
    return (
        <Modal
            open={open}
            title={
                !editData ?
                    <Typography.Title level={2}>New Transaction</Typography.Title>
                    :
                    <Typography.Title level={2}>Edit Transaction</Typography.Title>
            }
            onCancel={onCancel}
            footer={false}
        >
            <Form
                name="transaction-form"
                // initialValues={editData || null}
                initialValues={editData ?? null}
                onFinish={saveTransaction}
            >
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the title!'
                        },
                        {
                            min: 4,
                            message: 'Title must have atleast 4 characters'
                        }
                    ]}
                    hasFeedback={true}
                >
                    <Input
                        size='large'
                        placeholder="Title"
                    />
                </Form.Item>

                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Please enter the amount!' }]}
                    hasFeedback={true}
                >
                    <InputNumber
                        size='large'
                        placeholder="Amount"
                        min={0}
                        className='ant-input-number-full-width'
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    rules={[{ required: true, message: 'Please enter the date!' }]}
                    hasFeedback={true}
                >
                    <DatePicker format='DD MMM YYYY' size='large' />
                </Form.Item>

                <Form.Item
                    name="type"
                    rules={[{ required: true, /*message: 'Please enter the type!'*/ message: 'Did you spend or earn this amount?' }]}
                    hasFeedback={true}
                >
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

                <Form.Item
                    name="category"
                    rules={[{ required: true, message: 'Please enter the category!' }]}
                    hasFeedback={true}
                >
                    <AutoComplete
                        placeholder='Category'
                        options={transactionCategories}
                        size='large'
                        showAction="focus"
                        showArrow={true}
                        // allowClear={true}
                        backfill={true}
                        filterOption={true}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <Input
                        size='large'
                        placeholder="Description"
                    />
                </Form.Item>

                <Form.Item
                    name="recurring"
                    rules={[{ required: true, message: 'Is your transaction recurring?' }]}
                    hasFeedback={true}
                >
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

                <Form.Item
                    name="remind_after_days"
                    hasFeedback={true}
                >
                    <InputNumber
                        size='large'
                        placeholder="How many days between recurring emails"
                        min={0}
                        className='ant-input-number-full-width'
                    />
                </Form.Item>

                <Form.Item className='modal-submit-button'>
                    <Button type="primary" htmlType="submit" size='large'>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddEditTransaction