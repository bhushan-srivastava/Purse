import { Modal, Form, Button, Input, Typography, Select } from 'antd'

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

const EditCategory = ({ open, saveCategory, onCancel }) => {
    return (
        <Modal
            open={open}
            title={<Typography.Title level={2}>Edit category</Typography.Title>}
            onCancel={onCancel}
            footer={false}
        >
            <Form
                name="edit-category-form"
                onFinish={saveCategory}
            >
                <Form.Item
                    name="selectedCategory"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter which category you want to change!'
                        }
                    ]}
                    hasFeedback={true}
                >
                    <Select
                        showSearch={true}
                        placeholder='Category'
                        options={transactionCategories}
                        size='large'
                        // allowClear={true}
                        filterOption={true}
                    />
                </Form.Item>

                <Form.Item
                    name="newName"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the new name for the category!'
                        }
                    ]}
                    hasFeedback={true}
                >
                    <Input
                        size='large'
                        placeholder="New name for the category"
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

export default EditCategory