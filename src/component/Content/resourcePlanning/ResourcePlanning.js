import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import { Card, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import '../../../css/styles.css';

import TableResourcePlanning from "../../table/tableRPlanning/TableRPlanning";
import BtnViewEmp from "./BtnViewEmp";
import { Dropdown, Menu, Space, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  getProjects } from "../../../Store/Actions/ProjectActions";
import { getRoleByCode } from "../../../Store/Actions/PlanningRoleAction";
export default function ResourcePlanning() {
  const { pName } = useParams();
  // console.log(pName);
  const projects = useSelector(state=>state.Projects.projects)
  const planningRoles = useSelector(state=>state.PlanningRoles.roles)

  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(getRoleByCode(pName))
  }, [pName]);



   const menu = (
    <Menu    
      items={
        projects.map((item)=>(
          {
          key: item.id,
          label: (
            // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            //   1st menu item
            // </a>
            <Link to={`/resourcePlaning/${item.code}`}>{item.name}</Link>
          ),
        }
        ))
      }
    />
  );
  /////////////////
  // const menu = (
  //   <Menu
  //   // {projects.map((item)-)}
    
  //     items={[
  //       {
  //         key: "1",
  //         label: (
  //           // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
  //           //   1st menu item
  //           // </a>
  //           <Link to={`/resourcePlaning/project_name_1`}>project_name_1</Link>
  //         ),
  //       }
        
  //     ]}
  //   />
  // );

  if (!pName) {
    return (
      <Dropdown overlay={menu} >
        <Button>
          <Space>
            Project Name
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    );
  }
  // useEffect(()=>{
  //   // if(!pName){
  //   //   // Navigate()
  //   //   return
  //   // }
  // },[])
  return (
    <div>
      {/* <Dropdown ></Dropdown> */}
      <h3 style={{ fontWeight: "bold", color: "#121843" }}>
        Resource Planning
      </h3>
      <h5 style={{ color: "#162274" }}>
        Resource Planning | <span style={{ color: "#f66800" }}>{pName}</span>
      </h5>
      <div
        className="site-card-border-less-wrapper"
        style={{ display: "flex" }}
      >
        <Card
          style={{
            color: "#646464",
            fontWeight: "bold",
            border: "2px solid",
            backgroundColor: "#ededed",
            width: 300,
          }}
        >
          <p>Planned effort:</p>
          <p>Billable effort:</p>
          <p>Actual effort:</p>
        </Card>
        <div style={{ marginLeft: "700px" }}>
          <BtnViewEmp />
        </div>
      </div>

      <div style={{ marginTop: "5px" }}>
        <TableResourcePlanning 
        // {...planningRoles}
          planningRoles={planningRoles}
        />
      </div>
    </div>
  );
}
