import { Eventcalendar } from "@mobiscroll/react"; /* or import any other component */
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { Switch } from "antd";
import "./index.css";
import React, { useEffect, useState } from "react";
import { getResourcePoolEmp } from "../../Store/Actions/ResourcePoolAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddToProject from "../table/tableRPool/dotAction/addToProject/AddToProject";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../../App";

export default function Timeline() {
  //   const [myEvents, setEvents] = React.useState([]);
  const dispatch = useDispatch();
  const { bu, l, roleId } = useParams();
  const emps = useSelector((state) => state.ResourcePool.emps);
  const { user, valueInput } = useAuth();
  console.log(valueInput.emp_planning);
  useEffect(() => {
    dispatch(getResourcePoolEmp());
  }, []);

  const myEvents = React.useMemo(() => {
    return emps.map((item, index) => ({
      key: item.number,
      start: item?.Date_start,
      end: item?.Date_end,
      title:
        item?.ProjectName == null
          ? "Waiting for leader accept to the project"
          : item?.ProjectName +
            "|" +
            new Date(item?.Date_start).toLocaleDateString("es-CL") +
            "|" +
            new Date(item?.Date_end).toLocaleDateString("es-CL"),
      resource: item?.number,
    }));
  }, []);

  // const myEvents = emps.map((item, index) => ({
  //   key: index,
  //   start: item?.Date_start,
  //   end: item?.Date_end,
  //   title:
  //     item?.ProjectName == null
  //       ? "Waiting for leader accept to the project"
  //       : item?.ProjectName +
  //         "|" +
  //         new Date(item?.Date_start).toLocaleDateString("es-CL") +
  //         "|" +
  //         new Date(item?.Date_end).toLocaleDateString("es-CL"),
  //   resource: item?.number,
  // }));
  const myResources = React.useMemo(() => {
    return emps.map((item, index) => ({
      key: item.number,
      id: item.number,
      name: item?.Username,
      unit: item?.Department_name,
      role: item?.RoleName,
      level: item?.LevelName,
      SkillName: item?.SkillName,
      roleId: item?.Role_id,
      levelId: item?.level_id,
      skillId: item?.skill_id,
      User_id: item?.User_id,
      emp_id: item?.id,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }));
  }, []);

  // const myResources = emps.map((item, index) => ({
  //   key: index,
  //   id: item.number,
  //   name: item?.Username,
  //   unit: item?.Department_name,
  //   role: item?.RoleName,
  //   level: item?.LevelName,
  //   SkillName: item?.SkillName,
  //   roleId: item?.Role_id,
  //   levelId: item?.level_id,
  //   skillId: item?.skill_id,
  //   id: item?.id,
  //   User_id: item?.User_id,
  //   // color: "#3fd890",
  //   color: Math.floor(Math.random() * 16777215).toString(16),
  //   // skill:item?.SkillName,
  // }));

  const onClickIcon = (rowData) => {
    // console.log(rowData);
    if (l) {
      setUserData({
        Role_id: rowData.roleId,
        level_id: parseInt(l),
        skill_id: rowData.skillId,
        id: rowData.emp_id,
        Department_id: rowData.unit.substring(2, 4),
        User_id: rowData.User_id,
        Username: rowData.name,
        // buProject:bu
      });
    } else {
      setUserData({
        Role_id: rowData.roleId,
        level_id: rowData.levelId,
        skill_id: rowData.skillId,
        id: rowData.emp_id,
        Department_id: rowData.unit.substring(2, 4),
        User_id: rowData.User_id,
        Username: rowData.name,
      });
    }
  };
  const [userData, setUserData] = useState({
    role: "",
    level: "",
    skill: "",
    id: "",
    department_id: "",
  });
  const renderCustomResource = (resource) => {
    return (
      <div className="md-resource-header-template-cont">
        {user?.UserType != ROLES.EMPLOYEE ? (
          <div className="md-resource-header-template-icon">
            <span onClick={() => onClickIcon(resource)}>
              <AddToProject
                type={"icon"}
                buProject={bu}
                resourceRole_id={roleId}
                record={userData}
              />
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="md-resource-header-template-name">{resource.name}</div>
        <div className="md-resource-header-template-unit">{resource.unit}</div>

        <div className="md-resource-header-template-skill">
          {resource.SkillName}
        </div>
        <div className="md-resource-header-template-level">
          {resource.level}
        </div>
        <div className="md-resource-header-template-role">{resource.role}</div>
      </div>
    );
  };

  const renderCustomHeader = () => {
    return (
      <div className="md-resource-header-template-title">
        {user?.UserType != ROLES.EMPLOYEE ? (
          <div className="md-resource-header-template-icon">Action</div>
        ) : (
          ""
        )}

        <div className="md-resource-header-template-name">Employee</div>
        <div className="md-resource-header-template-unit">Unit</div>
        <div className="md-resource-header-template-skill">Skill</div>
        <div className="md-resource-header-template-level">Level</div>

        <div className="md-resource-header-template-role">Role</div>
      </div>
    );
  };

  const [switchType, SetSwitchType] = useState(true);
  const onChangeSwitch = () => {
    SetSwitchType(!switchType);
  };

  return (
    <>
      <Switch
        checkedChildren="month"
        onChange={() => onChangeSwitch()}
        unCheckedChildren="year"
        defaultChecked
      />
      {/* {console.log(emps)} */}
      <Eventcalendar
        theme="ios"
        themeVariant="light"
        view={{
          timeline: {
            type: switchType ? "month" : "year",
            startDay: 1,
            endDay: 5,
            eventList: true,
            weekNumbers: true,
          },
        }}
        data={myEvents}
        resources={myResources}
        renderResource={renderCustomResource}
        height="550px"
        renderResourceHeader={renderCustomHeader}
        cssClass="md-resource-header-template"
      />
    </>
  );
}
