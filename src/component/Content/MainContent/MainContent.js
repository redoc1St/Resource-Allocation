import { height } from "@mui/system";
import React, { useState } from "react";
import App from "../../../App";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import Search from "../../option/Search";
import TableData from "../../table/TableData";
import "./MainContent.css";
import ModalAddItem from "./ModalAddItem";

export default function MainContent() {

  const callbackFunction = (search) => {
    // this.setState({message: childData})
    // console.log(search);
    // setValueInput(search)
    // console.log(valueInput);

}

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

        <Search placeholder="Enter project name " parentCall={(search)=>callbackFunction(search)}/>
        <div style={{ marginTop: "15px" }}>
          <TableData/>
        </div>
        <div>
          <ModalAddItem />
        </div>
      </div>
    </div>
  );
}
