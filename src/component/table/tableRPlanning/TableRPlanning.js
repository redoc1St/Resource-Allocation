import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space, version, Form, Input } from "antd";
import { Table, Dropdown, Progress, Popconfirm, Menu } from "antd";
import "./tableRPlanning.css";
import DotAction from "./dotAction/DotAction";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
// import { Badge, Dropdown, Menu, Space, Table } from "antd";

export default function TableResourcePlanning(data) {
  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  useEffect(() => {
    // dispatch(getProjects());
  }, []);
  const columns = [
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 100,
    },
    // {
    //   title: "Planned quantity",
    //   dataIndex: "pQuantity",
    //   width: 100,
    //   editTable: true,
    // },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      width: 100,
      editTable: true,
    },
    {
      title: "Employee",
      dataIndex: "Fullname",
      width: 180,
      editTable: true,
    },
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
      title: "% Planned effort",
      dataIndex: "Effort_planned",
      width: 110,
    },
    {
      title: "% Actual effort",
      dataIndex: "Effort_actual",
      width: 100,
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
      title: "Level",
      dataIndex: "LevelName",
      width: 130,
    },
    {
      title: "Skills",
      dataIndex: "SkillName",
      width: 130,
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 130,
      render: (_, record) => {
        return <DotAction record={record} />;
      },
    },
  ];
  // let countQuantity =0;

  const mergedData = [
    { key: 0, role: "Total", Quantity:data.planningRoles.length  },
    ...data.planningRoles,
  ];

 

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
              }
            : { width: "200vh" }
        }
        className="-striped -highlight"
        dataSource={mergedData}
        size="small"
      ></Table>
    </div>
  );
}
