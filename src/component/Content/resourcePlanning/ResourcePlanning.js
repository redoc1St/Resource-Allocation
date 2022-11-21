import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import { Card, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "../../../css/styles.css";

import TableResourcePlanning from "../../table/tableRPlanning/TableRPlanning";
import BtnViewEmp from "./BtnViewEmp";
import { Dropdown, Menu, Space, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getRoleByCode } from "../../../Store/Actions/PlanningRoleAction";
import ModalAddRole from "./ModalAddItem";
import {
  getLeaderByCode,
  getLevels,
  getRoles,
  getSkills,
} from "../../../Store/Actions/ExtraObjectActions";
import axios from "axios";
import { useState } from "react";
export default function ResourcePlanning() {
  const { pName } = useParams();

  const projects = useSelector((state) => state.Projects.projects);
  const planningRoles = useSelector((state) => state.PlanningRoles.roles);
  const [getPId, setPID] = useState();
  const [getPName, setPName] = useState();
  const [getBU, setBU] = useState();


  const roles = useSelector((state) => state.ExtraObject.roles);
  const levels = useSelector((state) => state.ExtraObject.levels);
  const skills = useSelector((state) => state.ExtraObject.skills);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleByCode(pName));
  }, [pName]);
  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLevels());
    dispatch(getSkills());
    // dispatch(getLeaderByCode(pName))
    axios
      .get(process.env.REACT_APP_BASE_URL + `/api/${pName}`)
      .then(function (response) {
        // handle success
        // console.log(response.data[0].Depeartment_id);
        setPID(response.data[0].Project_id);
        setPName(response.data[0].ProjectName);
        setBU(response.data[0].Depeartment_id);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [pName]);

  const menu = (
    
    <Menu
      items={projects.map((item) => ({
        key: item.id,
        label: (
          <Link to={`/resourcePlaning/${item.code}`}>{item.name}</Link>
        ),
      }))}
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
      // <ListPane>
        <Dropdown overlay={menu}>
          <Button
            style={{
              border: "4px",
              boxShadow: " 0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Space>
              Project Name
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      // </ListPane>
    );
  }

  return (
    <div>
      <h3 style={{ fontWeight: "bold", color: "#121843" }}>
        Resource Planning
      </h3>
      <h5 style={{ color: "#162274" }}>
        Resource Planning | <span style={{ color: "#f66800" }}>{getPName}</span>
      </h5>
      <div
        className="site-card-border-less-wrapper"
        style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
      >
        <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
            Planned effort
            <br />
            (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
        <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
            Planned effort
            <br />
            (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
        <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
            Planned effort
            <br />
            (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
        {/* <Card
          style={{
            color: "#646464",
            fontWeight: "bold",
            border: "2px solid",
            backgroundColor: "#ededed",
            width: 300,
            height: 140,
          }}
        >
          <p>Planned effort:</p>
          <p>Billable effort:</p>
          <p>Actual effort:</p>
        </Card> */}
        {/* <div style={{ marginLeft: "700px" }}><BtnViewEmp /></div> */}
      </div>

      <div style={{ marginTop: "5px" }}>
        <TableResourcePlanning planningRoles={planningRoles} bu={getBU} />
        <ModalAddRole
          roles={roles}
          skills={skills}
          levels={levels}
          pId={getPId}
        />
      </div>
    </div>
  );
}
// const ListPane = styled.div``;
