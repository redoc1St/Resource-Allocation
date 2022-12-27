import React, { useState } from "react";
import { Button, Modal } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import { getProjects } from "../../../Store/Actions/ProjectActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Col, message, Row, Select } from "antd";

export default function ModalNote(data) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
// console.log(data.data);
  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmitNote = async (e) => {
    e.preventDefault();
    // console.log(e.target.elements.note.value);
    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + `/api/project/Note/${data.data.key}`,
        method: "PUT",
        data: {
          note: e.target.elements.note.value,
        },
      });
      setIsModalOpen(false);
      // dispatch(getProjects());
      // dispatch(getProjectsByName(valueInput ? valueInput : ""));
      message.success({
        content: "Edit note successfully",
        style: { marginTop: "50px" },
      });

      dispatch(getProjects());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <span style={{ border: "0", marginLeft: "10px" }} onClick={showModal}>
        <MessageIcon style={{ cursor: "pointer" }} />
      </span>
      <Modal
        title="Note for project"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmitNote}>
          <h4>Note for project:</h4>
          <textarea  maxLength={200} name="note" rows={4} cols={50} required defaultValue={data.data.note}/>
          <br />
          <input type="submit" value={'Submit'}/>
        </form>
      </Modal>
    </>
  );
}
