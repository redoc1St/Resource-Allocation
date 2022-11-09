import React, { useEffect, useState } from "react";
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
import ModalEditPoolEmp from "./edit/ModalEditEmp";
import { useDispatch, useSelector } from "react-redux";
import { getPNameByRLS } from "../../../../Store/Actions/ExtraObjectActions";

export default function DotAction(record) {
  const dispatch = useDispatch();

  // const PNames = useSelector((state) => state.ExtraObject.pName);
  // // console.log(record.record);
  // useEffect(() => {
  //   dispatch(getPNameByRLS(record?.record?.Role_id, record?.record?.level_id, record?.record?.skill_id));
  // }, []);
  // console.log(PNames);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <ModalEditPoolEmp {...record} />,
        },
        {
          key: "2",
          label: "Add item",
          // label: <Link onClick={handleRequest}>Request</Link>,
        },
        {
          key: "3",
          label: <AddToProject {...record} />,
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
