import React, { useEffect } from "react";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUsersByName,
  getUsersByNameAStatus,
} from "../../../Store/Actions/UserActions";
import { Divider, Tag } from "antd";

export default function TableCandidate() {
  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  const { valueInput, setValueInput, statusCand, setStatusCand } = useAuth();

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

    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 70,
      render: (_, record) => {
        // return <DotAction />;
      },
    },
  ];

  // const data = [
  //   {
  //     no: 1,
  //     employee: "Tinh Tri",
  //     level: "",
  //     skills: "Dev",
  //     office: "Cầu Giấy",
  //     role: "Tester",
  //     level: "Junior",
  //     skills: "Testing",
  //     project: "Project name 1",
  //     sDate: "14/12/2000",
  //     eDate: "23/09/2000",
  //     pEffort: "50%",
  //     bill: "Bill",
  //     pBill: "60%",
  //     unit: "BU1",
  //     leader: "QuangDD",
  //   },
  // ];
  console.log(users);
  const data = users.map((item) => ({
    no: countId++,
    key: item.User_id,

    ...item,
    Department_id: "BU " + item.Department_id,
    isActive:
      item.isActive === true ? (
        <Tag color="#87d068" style={{ width: "60px", textAlign: "center" }}>
          Active
        </Tag>
      ) : (
        <Tag color="#f50" style={{ width: "60px", textAlign: "center" }}>
          Inactive
        </Tag>
      ),
  }));

  return (
    <div>
      <Table
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
        className="-striped -highlight"
        dataSource={data}
        size="small"
      ></Table>
    </div>
  );
}
