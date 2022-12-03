import axios from "axios";
import React from "react";
import { message, Popconfirm } from "antd";

export default function UpdatePass(data) {
  const confirm = async (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append("ToEmail", data.Email);
    bodyFormData.append("Subject", "Your password has been reset");
    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + "/api/mail/sendMail",
        method: "post",
        data: bodyFormData,
      });
      message.success({
        content: "Reset password successfully",
        style: { marginTop: "50px" },
      });
    } catch (error) {
      console.log("fail");
    }
  };
  const cancel = (e) => {
//     console.log(e);
//     message.error("Click on No");
  };



  return (
    <div>
      <Popconfirm
        title="Are you sure to update password?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a style={{ color: "#62a3ff" }}>
          Reset pass
        </a>
      </Popconfirm>
    </div>
  );
}
