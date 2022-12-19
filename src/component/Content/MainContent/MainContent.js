import { height } from "@mui/system";
import React, { useState } from "react";
import App, { ROLES } from "../../../App";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import useAuth from "../../hooks/useAuth";
import Search from "../../option/Search";
import TableData from "../../table/TableData";
import "./MainContent.css";
import ModalAddItem from "./ModalAddItem";

export default function MainContent() {
  const { user } = useAuth();



  return (
    <div>
      <h3
        style={{
          // transform: translateX(-225px);

          fontWeight: "bold",
          color: "#121843",
        }}
      >
        Resource Allocation
      </h3>
      <div>
        <BasicBreadcrumbs />

        <Search type='project' placeholder="Enter project name " />
        <div style={{ marginTop: "15px" }}>
          <TableData/>
        </div>
        <div>
          
          {user?.UserType !==ROLES.EMPLOYEE ? <ModalAddItem /> :''} 
        </div>
      </div>
    </div>
  );
}
