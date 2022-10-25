import React, { useEffect } from "react";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import DotAction from "./dotAction/DotAction";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getResourcePoolEmp, getResourcePoolEmpByRLK } from "../../../Store/Actions/ResourcePoolAction";

export default function TableRPool(data) {

  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const emps = useSelector((state) => state.ResourcePool.emps);
      console.log(data?.Role_id,data?.Level_id,data?.Skill_id)
  useEffect(() => {
   if(Object.keys(data).length===0){//check data rỗng
    dispatch(getResourcePoolEmp());

   }else{
    dispatch(getResourcePoolEmpByRLK(data?.Role_id,data?.Level_id,data?.Skill_id));

   }
    
    
  }, [data?.Role_id,dispatch,]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 50,
    },

    {
      title: "Employee",
      dataIndex: "Fullname",
      width: 180,
      //   editTable: true,
    },
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 80,
    },

    {
      title: "Level ",
      dataIndex: "LevelName",
      width: 100,
    },
    {
      title: "Skills",
      dataIndex: "SkillName",
      width: 110,
    },

    {
      title: "Project",
      dataIndex: "ProjectName",
      width: 150,
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
      width: 80,
    },
    {
      title: "Bill/Unbill",
      dataIndex: "bill",
      width: 87,
    },
    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 80,
    },
    {
      title: "Unit",
      dataIndex: "Department_name",
      width: 70,
    },
    {
      title: "Leader",
      dataIndex: "leader",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 70,
      render: (_, record) => {
        return <DotAction />;
      },
    },
  ];
let countEmp =0;
  const modifiedData=emps.map((item)=>({
    no:countEmp+=1,
...item
  }))

  

  return (
    <div>
      {console.log(modifiedData)}
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
                  marginTop:'20px'
                }
              : { width: "200vh" }
          }
        className="-striped -highlight"
        dataSource={modifiedData}
        size="small"
      ></Table>
    </div>
  );
}
