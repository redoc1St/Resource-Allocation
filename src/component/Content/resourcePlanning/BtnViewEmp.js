import React, { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, Modal, Table } from "antd";
export default function BtnViewEmp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // console.log(record.record.record.role)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Employees",
      dataIndex: "employees",
      width: 100,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 100,
    },
    {
      title: "Start date",
      dataIndex: "sDate",
      width: 100,
    },
    {
      title: "End date",
      dataIndex: "eDate",
      width: 100,
    },
    {
      title: "% Effort",
      dataIndex: "pEffort",
      width: 100,
    },
    {
      title: "% Bill",
      dataIndex: "pBill",
      width: 100,
    },
    {
      title: "Level",
      dataIndex: "level",
      width: 100,
    },
    {
      title: "Skill",
      dataIndex: "skill",
      width: 100,
    },
    {
      title: "Action",
      key: "operation",
      fixed:'right',
      width: 100,
    },
  ]

  return (
    <div>
      <button
        style={{
          backgroundColor: "rgb(237, 237, 237)",
          color: "black",
          height: "45px",
          border: "2px solid",
          marginLeft: "50px",
          marginTop: "30px",
          borderRadius: "2px",
        }}
        onClick={showModal}
      >
        <PeopleAltIcon
          style={{ color: "rgb(246, 104, 0)", marginBottom: "3px" }}
        />
        View Employee
      </button>
      <Modal
        width={700}

        title="View Employee"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: "flex" }}>
          <h5>Plan Quantity &nbsp;&nbsp;&nbsp;&nbsp;</h5>
          <input
            style={{
              border: "2px solid",
              height: "30px",
              width: "40px",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom:'5px',
              fontSize: "18px",
            }}
            // value="2"
          />

          <h5>
            &nbsp;&nbsp;&nbsp;&nbsp; Actual Quantity &nbsp;&nbsp;&nbsp;&nbsp;
            <input
            style={{
              border: "2px solid",
              height: "30px",
              width: "40px",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom:'5px',
              fontSize: "18px",
            }}
            // value="2"
          />
          </h5>
        </div>
        <Table columns={columns}>

        </Table>
      </Modal>
    </div>
  );
}
