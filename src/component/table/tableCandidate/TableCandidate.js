import React, { useEffect, useState } from "react";
import { message, Popconfirm, Table } from "antd";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Store/Actions/UserActions";

import { Tag } from "antd";
import UpdatePass from "./UpdatePass";
import { ROLES } from "../../../App";
import axios from "axios";

export default function TableCandidate() {
  const { onclickShowLeft } = useAuth();
  const { statusCand, user } = useAuth();

  const dispatch = useDispatch();
  const users = useSelector((state) => state?.Users?.users);
  let countId = 1;

  useEffect(() => {
    //   if (valueInput) {
    //     // dispatch(getUsersByName(valueInput));
    //     dispatch(getUsersByNameAStatus(valueInput, statusCand));
    //   }else if(statusCand==="all"){
    //  dispatch(getUsers());
    //   } else {
    //     dispatch(getUsersByNameAStatus(" ", statusCand));
    //   }
  }, [statusCand, dispatch]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 50,
      sorter: (a, b) => a.no - b.no,
    },

    {
      title: "Name",
      dataIndex: "Fullname",
      width: 100,
      sorter: (a, b) => a.Fullname.localeCompare(b.Fullname),

      //   editTable: true,
    },
    {
      title: "email",
      dataIndex: "Email",
      width: 150,
      //   editTable: true,
    },
    {
      title: "Address",
      dataIndex: "Address",
      width: 80,
    },
    {
      title: "Birthday",
      dataIndex: "BirthDay",
      width: 100,
    },
    {
      title: "User Type",
      dataIndex: "UserType",
      filters: [
        {
          text: "leader",
          value: "leader",
        },
        {
          text: "employee",
          value: "employee",
        },
      ],
      onFilter: (value, record) => record.UserType.indexOf(value) === 0,
      width: 80,
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   width: 80,
    // },

    // {
    //   title: "Skill",
    //   dataIndex: "skill",
    //   width: 100,
    // },
    // {
    //   title: "Level",
    //   dataIndex: "level",
    //   width: 110,
    // },

    {
      title: "Department",
      dataIndex: "Department_id",
      filters: [
        {
          text: "BU 1",
          value: "BU 1",
        },
        {
          text: "BU 2",
          value: "BU 2",
        },
        {
          text: "BU 3",
          value: "BU 3",
        },
        {
          text: "BU 4",
          value: "BU 4",
        },
        {
          text: "BU 5",
          value: "BU 5",
        },
      ],
      onFilter: (value, record) => record.Department_id.indexOf(value) === 0,

      width: 80,
    },

    {
      title: "Status",
      dataIndex: "isActive",
      width: 80,
    },
    user?.UserType === ROLES.ADMIN
      ? {
          title: "Action",
          dataIndex: "action",
          fixed: "right",
          width: 130,
          render: (_, record) => {
            // <a>Update password</a>
            return <UpdatePass {...record} />;
          },
        }
      : { fixed: "right", width: 20 },
  ];
  // console.log(users.Password);

  const confirm = async (e) => {
    console.log(e.isActive);
    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + `/api/User/status/${e.User_id}`,
        method: "PUT",
        data: {
          isActive: e.isActive ? 0 : 1,
        },
      });
      // dispatch(getUsers());
      if (res.data == "FAILS") {
        message.error({
          content:
            "Cannot change status because this employee still in project ",
          style: { marginTop: "50px" },
        });
      } else {
        message.success({
          content: "Update status successfully",
          style: { marginTop: "50px" },
        });
      }

      dispatch(getUsers());
    } catch (error) {
      console.log("fail");
    }
  };

  const data = users.map((item) => ({
    no: countId++,
    key: item.User_id,

    ...item,
    Department_id: "BU " + item.Department_id,
    BirthDay: new Date(item.BirthDay).toLocaleDateString("es-CL"),
    isActive: (
      <Popconfirm
        title="Are you sure to change status ?"
        onConfirm={() => confirm(item)}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        {item.isActive === true ? (
          <Tag color="#87d068" style={{ width: "60px", textAlign: "center" }}>
            Active
          </Tag>
        ) : (
          <Tag color="#f50" style={{ width: "60px", textAlign: "center" }}>
            Inactive
          </Tag>
        )}
      </Popconfirm>
    ),
  }));

  return (
    <div>
      <Table
        bordered
        columns={columns}
        scroll={{
          // x: 600,
          y: 300,
        }}
        style={
          onclickShowLeft
            ? {
                width: "170vh",
                marginTop: "10px",
              }
            : { width: "200vh" }
        }
        className="table-striped-rows"
        dataSource={data}
        size="small"
      ></Table>
    </div>
  );
}
