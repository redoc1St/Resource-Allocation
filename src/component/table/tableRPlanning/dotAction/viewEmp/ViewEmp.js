import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, Modal, Table } from "antd";
import { getRolesByNameNRole } from "../../../../../Store/Actions/PlanningRoleAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
export default function ViewEmp(data) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pName: code } = useParams();
  const { quantity, setQuantity } = useAuth();

  const showModal = () => {
    // console.log(record.record.record.role)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const rolesEmp = useSelector((state) => state.PlanningRoles.rolesEmp);

  useEffect(() => {
    dispatch(
      getRolesByNameNRole(data?.record?.ProjectName, data?.record?.RoleName)
    );
  }, [data?.record?.ProjectName]);

  let countEmp = 0;
  const mergedData = rolesEmp.map((item) => ({
    countEmp: (countEmp += 1),
    ...item,
    Role: data?.record?.RoleName,
  }));

  const columns = [
    {
      title: "Employees",
      dataIndex: "Fullname",
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "Role",
      width: 60,
    },
    {
      title: "Start date",
      dataIndex: "Date_start",
      width: 130,
    },
    {
      title: "End date",
      dataIndex: "Date_end",
      width: 130,
    },
    {
      title: "% Effort",
      dataIndex: "Effort_planned",
      width: 100,
    },
    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 80,
    },
    {
      title: "Level",
      dataIndex: "LevelName",
      width: 100,
    },
    {
      title: "Skill",
      dataIndex: "SkillName",
      width: 100,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
    },
  ];

  return (
    <div>
      <span onClick={showModal}>View Employee</span>
      <Modal
        width={900}
        title="View list Employee by Role"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: "flex" }}>
          {/* <h5>Plan Quantity &nbsp;&nbsp;&nbsp;&nbsp;</h5>
          <input
            style={{
              border: "2px solid",
              height: "30px",
              width: "40px",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom: "5px",
              fontSize: "18px",
            }}
            value="2"
          /> */}

          <h5>
            &nbsp;&nbsp; Actual Quantity &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              style={{
                border: "2px solid",
                height: "30px",
                width: "40px",
                borderRadius: "5px",
                textAlign: "center",
                marginBottom: "5px",
                fontSize: "18px",
              }}
              value={countEmp}
            />
          </h5>
        </div>
        <Table columns={columns} dataSource={mergedData}></Table>
      </Modal>
    </div>
  );
}
