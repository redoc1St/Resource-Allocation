import React, { useState } from "react";
import { Button, Modal } from "antd";
import MessageIcon from '@mui/icons-material/Message';
export default function ModalNote() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <span style={{ border: "0", marginLeft:'10px' }} onClick={showModal}>
        <MessageIcon style={{ cursor: "pointer" }} />
      </span>
      <Modal
        title="Note for project"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
