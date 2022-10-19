import React, { useEffect } from "react";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Store/Actions/UserActions";
import { Divider, Tag } from 'antd';

export default function TableCandidate() {

  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  
  const dispatch =useDispatch()
  const users = useSelector(state=>state?.Users?.users)
  let countId=1;

  useEffect(()=>{
    dispatch(getUsers())
  },[])
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 50,
    },

    {
      title: "Name",
      dataIndex: "Fullname",
      width: 100,
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
      width: 150,
    },

    {
      title: "Status",
      dataIndex: "isActive",
      width: 130,
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

const data= users.map((item)=>({
  no:countId++,
  ...item,
  isActive: item.isActive===true ?<Tag color="#87d068" style={{width:'60px',textAlign:'center'}}>Active</Tag>
  :<Tag color="#f50" style={{width:'60px',textAlign:'center'}}>Inactive</Tag>
}))

  return (
    <div>
      {console.log(users)}
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
                  marginTop:'20px'
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
