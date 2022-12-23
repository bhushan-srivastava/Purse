import { Modal, Form, Button, Input, InputNumber, DatePicker, Radio, Typography, AutoComplete } from 'antd'

const AddEditTransaction = ({
    open,
    categories,
    initialValues,
    saveTransaction,
    onCancel }) => {

    return (
        <Modal
            open={open}
            title={
                <Typography.Title level={2}>
                    {/* check if there is a title or not, to see if it is a new transaction or an edit transaction */}
                    {!initialValues.title ? "New Transaction" : "Edit Transaction"}
                </Typography.Title>
            }
            onCancel={onCancel}
            footer={false}
        >
            <Form
                // form={form}
                name="transaction-form"
                // initialValues={selectedTransaction || {}}
                // initialValues={selectedTransaction ?? {}}
                // initialValues={selectedTransaction ?? null}
                initialValues={initialValues}
                onFinish={saveTransaction}
                layout='vertical'
            // onFinish={console.log}
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
                // valuePropName='date'
                >
                    <DatePicker
                        format='DD MMM YYYY'
                        // format='MMM DD YYYY'
                        size='large'
                        placeholder='Date'
                    />
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
                        placeholder='Category Eg. Food, travel, etc'
                        options={categories}
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
                    // rules={[{ required: true, message: 'Is your transaction recurring?' }]}
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
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="remind_on"
                    tooltip='If you have a recurring transaction, you can choose to get an email reminder about it.'
                    label='Email reminder'
                    // valuePropName='date'
                    hasFeedback={true}
                >
                    <DatePicker
                        format='DD MMM YYYY'
                        // format='MMM DD YYYY'
                        size='large'
                        placeholder='Remind on'
                    />
                </Form.Item>

                <Form.Item className='modal-submit-button'>
                    <Button htmlType="reset" size='large' onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button type="primary" htmlType="submit" size='large'>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AddEditTransaction