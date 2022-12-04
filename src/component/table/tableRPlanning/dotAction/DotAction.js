import React, { useState } from "react";
import {
  Table,
  Dropdown,
  Progress,
  Space,
  Popconfirm,
  Menu,
  Modal,
} from "antd";
import ModalEditPlan from "./edit/ModalEditPlan";
import ResourcePool from "../../../Content/MainContent/resourcePool/ResourcePool";
import { Link, Navigate, Route } from "react-router-dom";
import BtnViewEmp from "../../../Content/resourcePlanning/BtnViewEmp";
import ViewEmp from "./viewEmp/ViewEmp";
import Request from "./request/Request";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../../App";

export default function DotAction(record) {
  const { user } = useAuth();

  // console.log(record.record.Status);
  const menu = (
    <Menu
      items={[
        {
          key: "4",
          label: <ViewEmp {...record} />,
        },
        user?.UserType != ROLES.EMPLOYEE
          ? {
              key: "1",
              // label: <ModalEditPlan record={record} />,
              label: <ModalEditPlan {...record} />,
            }
          : {},
        // user?.UserType != ROLES.ADMIN
        //   ?
        {
          key: "2",
          // label: <Link to={{pathname:'/resourcePool'}} state={record} >Request</Link>,
          label:
            record.record.Status?.props.children === "Approved" ||
            record.record.Status?.props.children === "Rejected" ||
            record.record.Status?.props.children === "In Progress" ? (
              ""
            ) : user?.UserType == ROLES.ADMIN ? (
              <Request record={record} />
            ) : (
              ""
            ),
        },
        // : {},
        // {
        //   key: "3",
        //   label: "Delete",
        // },
        // {
        //   key: "4",
        //   label: "Action 2"
        // }
      ]}
    />
  );
  return (
    <div>
      <Space>
        <Dropdown overlay={menu}>
          <a
            style={{
              color: "black",
              fontSize: "20px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            ...
          </a>
        </Dropdown>
      </Space>
    </div>
  );
}
