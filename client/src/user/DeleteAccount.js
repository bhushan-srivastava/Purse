import { Button, Modal } from 'antd';
import { useState } from 'react';

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };
    return (
        <>
            <Button type={"primary"} onClick={showModal}>
                Open Modal with customized button props
            </Button>
            <Modal
                title="Basic Modal"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    danger: true,
                    type: "default"
                }}
            >
                delete account contents
            </Modal>
        </>
    );
};

export default DeleteAccount;