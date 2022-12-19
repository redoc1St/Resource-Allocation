import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "../../../css/styles.css";

import TableResourcePlanning from "../../table/tableRPlanning/TableRPlanning";
import { Dropdown, Menu, Space, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getRoleByCode } from "../../../Store/Actions/PlanningRoleAction";
import ModalAddRole from "./ModalAddItem";
import {
  getLeaderByBU,
  getLevels,
  getRoles,
  getSkills,
} from "../../../Store/Actions/ExtraObjectActions";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import axios from "axios";
import { useState } from "react";
import { ROLES } from "../../../App";
import useAuth from "../../hooks/useAuth";
import {
  getProjects,
  getProjectsByBuId,
} from "../../../Store/Actions/ProjectActions";
export default function ResourcePlanning() {
  const { pName } = useParams();
  const navigate = useNavigate();

  const projects = useSelector((state) => state.Projects.projects);
  const planningRoles = useSelector((state) => state.PlanningRoles.roles);
  const [getPId, setPID] = useState();
  const [getPName, setPName] = useState();
  const [getBU, setBU] = useState();
  const [dateProject, setDateProject] = useState({});
  const [projectByCode, setProjectByCode] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { user } = useAuth();

  const roles = useSelector((state) => state.ExtraObject.roles);
  const levels = useSelector((state) => state.ExtraObject.levels);
  const skills = useSelector((state) => state.ExtraObject.skills);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleByCode(pName));
    user?.UserType != ROLES.ADMIN
      ? dispatch(getProjectsByBuId(user?.Department_id))
      : dispatch(getProjects());
  }, [pName]);
  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLevels());
    dispatch(getSkills());
    axios
      .get(process.env.REACT_APP_BASE_URL + `/api/${pName}`)
      .then(function (response) {
        // handle success
        // console.log(response.data[0].Depeartment_id);
        setPID(response.data[0].Project_id);
        setPName(response.data[0].ProjectName);
        setBU(response.data[0].Depeartment_id);
        setDateProject({
          sDate: response.data[0].Start_actual,
          eDate: response.data[0].End_actual,
        });
        setProjectByCode(response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [pName]);

  const sendTotalToParent = (value) => {
    // console.log(value);
    setTotalQuantity(value);
    // setDrive(index);
  };
  const menu = (
    <Menu
      items={projects.map((item) => ({
        key: item.id,
        label: <Link to={`/resourcePlaning/${item.code}`}>{item.name}</Link>,
      }))}
    />
  );

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
      {/* {console.log(totalQuantity)} */}
      <h5 style={{ color: "#162274" }}>
        <span onClick={() => navigate(-1)}>
          <ArrowBackIosIcon style={{ cursor: "pointer", color: "black" }} />
        </span>{" "}
        | Resource Planning |{" "}
        <span style={{ color: "#f66800" }}>{getPName}</span>
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
          (MM)
          <p style={{ fontSize: "30px" }}>
            {((new Date(projectByCode.End_plan) -
              new Date(projectByCode.Start_plan)) *
              projectByCode.Effort_actual *
              totalQuantity) /
              (1000 * 3600 * 24 * 100)}
          </p>
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
          Actual effort
          <br />
          (MM)
          <p style={{ fontSize: "30px" }}>
            {((new Date(projectByCode.End_actual) -
              new Date(projectByCode.Start_actual)) *
              projectByCode.Effort_planned *
              totalQuantity) /
              (1000 * 3600 * 24 * 100)}
          </p>
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
          Billable effort
          <br />
          (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
      </div>
      <div style={{ marginTop: "5px" }}>
        <TableResourcePlanning
          name={getPName}
          {...dateProject}
          planningRoles={planningRoles}
          bu={getBU}
          project={projectByCode}
          sendTotalToParent={sendTotalToParent}
        />
        {user?.UserType != ROLES.EMPLOYEE ? (
          <ModalAddRole
            name={getPName}
            roles={roles}
            skills={skills}
            levels={levels}
            pId={getPId}
            {...dateProject}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
// const ListPane = styled.div``;
