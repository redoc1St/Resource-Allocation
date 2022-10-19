import React, { useState } from "react";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import { Button, Slider, Space } from "antd";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import "./RequestPage.css";
import GeneralRequests from "./TableRequests/GeneralRequests";
import SpecificRequests from "./TableRequests/SpecificRequests";
export default function RequestPage() {
  const [value, setValue] = useState("gr");

  const onCLick = (e) => {
    setValue(e);
    
  };
  const showTable =()=>{
    if(value==='gr'){
      return <GeneralRequests/>
    }
    if(value==='sr'){
      return <SpecificRequests/>
    }
  }
  return (
    <div>
      <h3
        style={{
          fontWeight: "bold",
          color: "#121843",
        }}
      >
        Requests
      </h3>
      <div>
        <BasicBreadcrumbs />
        <div className="abc">
          {/* <NavLink to='/'> asd</NavLink> */}
          <span
            className="requests"
            onClick={() => onCLick("gr")}
            style={{ backgroundColor: value === "gr" ? "#88ece6" : "" }}
          >
            General Request
          </span>
          <span
            className="requests"
            onClick={() => onCLick("sr")}
            style={{ backgroundColor: value === "sr" ? "#88ece6" : "" }}
          >
            Specific Request
          </span>
        </div>
        <div style={{marginTop:'15px'}}>
        {showTable()}

        </div>
      </div>
    </div>
  );
}
