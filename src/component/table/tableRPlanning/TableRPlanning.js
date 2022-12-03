import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space, version, Form, Input } from "antd";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import "./tableRPlanning.css";
import DotAction from "./dotAction/DotAction";
import { Divider, Tag } from "antd";

import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
// import { Badge, Dropdown, Menu, Space, Table } from "antd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link, useParams } from "react-router-dom";
import { getLeaderByCode } from "../../../Store/Actions/ExtraObjectActions";
import { ROLES } from "../../../App";
export default function TableResourcePlanning(data) {
  const { onclickShowLeft, setOnclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const { pName } = useParams();
  const { user } = useAuth();

  const projects = useSelector((state) => state.Projects.projects);
  const { quantity, setQuantity } = useAuth();
  const leader = useSelector((state) => state.ExtraObject.leader);
  useEffect(() => {
    dispatch(getLeaderByCode(pName));
  }, []);
  const columns = [
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 100,
    },
    {
      title: "Planned quantity",
      dataIndex: "Quantity",
      width: 75,
      editTable: true,
    },
    {
      title: "Actual quantity",
      dataIndex: "ActualQuantity",
      width: 75,
      editTable: true,
    },
    {
      title: "Level",
      dataIndex: "LevelName",
      width: 130,
    },
    {
      title: "Skills",
      dataIndex: "SkillName",
      width: 130,
    },
    user?.UserType !=ROLES.EMPLOYEE ?
    {
      title: "Employee",
      dataIndex: "employee",
      width: 85,
      editTable: true,
    } : {},
    {
      title: "Start date ",
      dataIndex: "Date_start",
      width: 150,
    },

    {
      title: "End date ",
      dataIndex: "Date_end",
      width: 150,
    },
    {
      title: "%Planned effort",
      dataIndex: "Effort_planned",
      width: 85,
    },
    {
      title: "% Actual effort",
      dataIndex: "Effort_actual",
      width: 80,
    },
    {
      title: "Bill/Unbill",
      dataIndex: "bill",
      width: 100,
    },

    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 100,
      // render: (_, record) => {
      //   return <DotAction record={record} />;
      // },
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 70,
      // render: (_, record) => {
      //   return <DotAction record={record} />;
      // },
    },
  ];
  // let countQuantity =0;

  const mergedData = [
    {
      key: 0,
    },
    ...data.planningRoles,
  ];
  const ar = [1, 2, 3, 4];
  const mergedData2 = mergedData.map((item, index) =>
    index > 0
      ? {
          key: item.id,
          ...item,
          ActualQuantity: ar[0]++,
          status: item.Status,

          action: <DotAction record={item} leader={leader} />,
          employee:
            item?.Status?.props?.children === "Approved" ? (
              <Link
                to={{ pathname: `/resourcePool/${pName}/${item.Role_id}/${item.Level_id}/${ item.Skill_id}` }}
                state={[item.Role_id, item.Level_id, item.Skill_id,pName,data.bu, item.id]}
              >
                <PersonAddIcon />
              </Link>
            ) : (
              ""
            ),
        }
      : {
          key: 0,
          RoleName: "Total",
          Quantity:
            data?.planningRoles[data.planningRoles.length - 1]?.totalPQuantity,
        }
  );
  console.log(data.planningRoles);
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
              }
            : { width: "200vh" }
        }
        className="-striped -highlight"
        dataSource={mergedData2}
        size="small"
      ></Table>
    </div>
  );
}
