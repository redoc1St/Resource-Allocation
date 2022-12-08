import React, { useEffect } from "react";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import DotAction from "./dotAction/DotAction";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  getResourcePoolEmp,
  getResourcePoolEmpByBU,
  getResourcePoolEmpByRLK,
  getSearchResourcePoolEmpByName,
} from "../../../Store/Actions/ResourcePoolAction";
import { ROLES } from "../../../App";

export default function TableRPool(data) {
  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const emps = useSelector((state) => state.ResourcePool.emps);
  const { valueInput, user } = useAuth();

  // console.log(data?.Role_id, data?.Level_id, data?.Skill_id);
  //  console.log(data);   // BU NAME
  //  console.log(data[5]);   // resourcePlanning_id

  // console.log(emps[14].ProjectName ==null);
  useEffect(() => {
    if (user)
      if (valueInput?.emp_planning) {
        dispatch(getSearchResourcePoolEmpByName(valueInput.emp_planning));
      } else {
        if (Object.keys(data).length === 0) {
          //check data rỗng
          user?.UserType == ROLES.EMPLOYEE
            ? dispatch(getResourcePoolEmpByBU(user?.Department_id))
            : dispatch(getResourcePoolEmp());
        } else {
          dispatch(
            // 3 vị trí  0,1,2 tương đương với 3 vị trí role level skill lấy bên tableRPlanning lúc truyền vào state
            getResourcePoolEmpByRLK(data[0], data[1], data[2])
          );
        }
      }
  }, [data?.Role_id, dispatch, user, valueInput]);
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
    user?.UserType != ROLES.EMPLOYEE
      ? {
          title: "Action",
          dataIndex: "action",
          fixed: "right",
          width: 70,
          render: (_, record) => {
            return (
              <DotAction
                record={record}
                buProject={data[4]}
                resourceRole_id={data[5]}
              />
            );
          },
        }
      : {},
  ];
  let countEmp = 0;
  const modifiedData = emps.map((item, index) => ({
    no: (countEmp += 1),
    key: index,

    ...item,
  }));

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
                marginTop: "20px",
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
