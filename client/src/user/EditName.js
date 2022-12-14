import { Modal, Form, Button, Input, Typography } from 'antd'

const EditName = ({ open, initialValues, saveName, onCancel }) => {
    return (
        <Modal
            open={open}
            title={<Typography.Title level={2}>Edit Name</Typography.Title>}
            onCancel={onCancel}
            footer={false}
        >
            <Form
                name="edit-name-form"
                onFinish={saveName}
                initialValues={initialValues}
            >
                <Form.Item
                    name='newName'
                    // name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name!'
                        },
                        {
                            min: 4,
                            message: 'Name must have atleast 4 characters'
                        }
                    ]}
                    hasFeedback={true}
                >
                    <Input
                        size='large'
                        placeholder="Name"
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
        </Modal>
    )
}

export default EditName