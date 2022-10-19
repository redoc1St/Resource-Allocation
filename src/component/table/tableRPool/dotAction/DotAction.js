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
// import ModalEditPlan from "./edit/ModalEditPlan";
// import ResourcePool from "../../../Content/MainContent/resourcePool/ResourcePool";
import { Link, Navigate, Route } from "react-router-dom";
import ModalEditEmp from "./edit/ModalEditEmp";
import AddToProject from "./addToProject/AddToProject";

export default function DotAction(record) {

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <ModalEditEmp />
        },
        {
          key: "2",
          label:"Add item",
          // label: <Link onClick={handleRequest}>Request</Link>,
        },
        {
          key: "3",
          label: <AddToProject /> ,
        },
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
