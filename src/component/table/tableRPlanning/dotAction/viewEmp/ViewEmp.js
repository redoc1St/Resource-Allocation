import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, message, Modal, Table, Popconfirm } from "antd";
import {
  getRoleByCode,
  getRolesByNameNRole,
} from "../../../../../Store/Actions/PlanningRoleAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { ROLES } from "../../../../../App";
export default function ViewEmp(data) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { pName: code } = useParams();
  // const { quantity, setQuantity } = useAuth();
  const { pName } = useParams();
  const { user } = useAuth();

  const showModal = () => {
    // console.log(data?.record?.id)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const rolesEmp = useSelector((state) => state.PlanningRoles.rolesEmp);

  useEffect(() => {
    dispatch(getRolesByNameNRole(data?.record?.ProjectName, data?.record?.id));
  }, [data?.record?.ProjectName, isModalOpen]);

  let countEmp = 0;
  const mergedData = rolesEmp.map((item, id) => ({
    key: id,
    countEmp: (countEmp += 1),
    ...item,
    Role: data?.record?.RoleName,
  }));

  const onClickDel = async (values) => {
    console.log(values);
    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + "/api/ResourcePlanning/delete",
        method: "DELETE",
        data: {
          resourceRole_id: values.id,
          employee_id: values.employee_id,
        },
      });
      if (res.data == "Delete Successfully") {
        message.success({
          content: "Delete employee successfully",
          style: { marginTop: "50px" },
        });
        dispatch(getRoleByCode(pName));

        // getRolesByNameNRole(data?.record?.ProjectName, data?.record?.RoleName);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      dataIndex: "Effort",
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
    user?.UserType != ROLES.EMPLOYEE
      ? {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 100,
          render: (_, record) => {
            return (
              <>
                <Popconfirm
                  title="Are you sure to delete this record?"
                  onConfirm={() => onClickDel(record)}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <span
                    // onClick={() => onClickDel(record)}
                    style={{ textAlign: "center" }}
                  >
                    <DeleteForeverIcon
                      style={{ fontSize: "30px", cursor: "pointer" }}
                    />
                  </span>
                </Popconfirm>
              </>
            );
          },
        }
      : {},
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
              disabled
              value={countEmp}
            />
          </h5>
        </div>
        <Table columns={columns} dataSource={mergedData}></Table>
      </Modal>
    </div>
  );
}
