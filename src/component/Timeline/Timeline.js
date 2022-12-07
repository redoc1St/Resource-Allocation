import { Eventcalendar } from "@mobiscroll/react"; /* or import any other component */
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Switch, Table } from "antd";
import "./index.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import React, { useEffect, useState } from "react";
import { getResourcePoolEmp } from "../../Store/Actions/ResourcePoolAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import AddToProject from "../table/tableRPool/dotAction/addToProject/AddToProject";
import useAuth from "../hooks/useAuth";
import Login from "../login/Login";

export default function Timeline() {
  //   const [myEvents, setEvents] = React.useState([]);
  const dispatch = useDispatch();
  const emps = useSelector((state) => state.ResourcePool.emps);
  // const [idEmp, setIdEmp]= useState(0);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getResourcePoolEmp());
  }, []);
   let idEmp=0

  const myEvents = React.useMemo(() => {
    return emps.map((item,index) => ({
      key:index,
      start: item?.Date_start,
      end: item?.Date_end,
      title:
        item?.ProjectName == null
          ? "Waiting for leader accept to the project"
          : item?.ProjectName + "|" + item?.Date_start + "|" + item?.Date_end,
      resource: item?.number,
    }));
    // [{
    //     start: '2022-10-02T00:00',
    //     end: '2022-10-05T00:00',
    //     title: 'Event 1',
    //     resource: idEmp
    // }, {
    //     start: '2022-10-02',
    //     end: '2022-10-05',
    //     title: 'Event 1',
    //     resource: idEmp
    // },
    // {
    //     start: '2022-10-10T09:00',
    //     end: '2022-10-15T15:00',
    //     title: 'Event 2',
    //     resource: idEmp
    // }, {
    //     start: '2022-10-12T00:00',
    //     end: '2022-10-14T00:00',
    //     title: 'Event 3',
    //     resource: idEmp
    // }, {
    //     start: '2022-10-15T07:00',
    //     end: '2022-10-20T12:00',
    //     title: 'Event 4',
    //     resource: idEmp
    // }, {
    //     start: '2022-10-03T00:00',
    //     end: '2022-10-10T00:00',
    //     title: 'Event 5',
    //     resource: 6
    // }, {
    //     start: '2022-10-10T08:00',
    //     end: '2022-10-11T20:00',
    //     title: 'Event 6',
    //     resource: 7
    // }, {
    //     start: '2022-10-22T00:00',
    //     end: '2022-10-28T00:00',
    //     title: 'Event 7',
    //     resource: 7
    // }, {
    //     start: '2022-10-08T00:00',
    //     end: '2022-10-13T00:00',
    //     title: 'Event 8',
    //     resource: 15
    // }, {
    //     start: '2022-10-25T00:00',
    //     end: '2022-10-27T00:00',
    //     title: 'Event 9',
    //     resource: 10
    // }, {
    //     start: '2022-10-20T00:00',
    //     end: '2022-10-23T00:00',
    //     title: 'Event 10',
    //     resource: 12
    // }]
  }, []);
  // console.log(emps);
  const myResources = React.useMemo(() => {
    return emps.map((item,index) => ({
      key:index,
      id: item.number,
      name: item?.Username,
      unit: item?.Department_name,
      role: item?.RoleName,
      level: item?.LevelName,
      SkillName: item?.SkillName,
      roleId: item?.Role_id,
      levelId: item?.level_id,
      skillId: item?.skill_id,
      id: item?.id,
      User_id:item?.User_id,
      // color: "#3fd890",
      color: Math.floor(Math.random()*16777215).toString(16)
      // skill:item?.SkillName,
    }));
    // [
    //   {
    //     id: 1,
    //     name: "Flatiron Room",
    //     seats: 155,
    //     role:'DES',
    //     color: "#fdf500",
    //   },
    //   {
    //     id: 2,
    //     name: "The Capital City",
    //     seats: 250,
    //     color: "#ff0101",
    //   },
    //   {
    //     id: 3,
    //     name: "Heroes Square",
    //     seats: 400,
    //     color: "#01adff",
    //   },
    //   {
    //     id: 4,
    //     name: "Thunderdome",
    //     seats: 1200,
    //     color: "#239a21",
    //   },
    //   {
    //     id: 5,
    //     name: "King’s Landing",
    //     seats: 550,
    //     color: "#ff4600",
    //   },
    //   {
    //     id: 6,
    //     name: "Gathering Field",
    //     seats: 900,
    //     color: "#8f1ed6",
    //   },{
    //     id: 6,
    //     name: "Gathering Field",
    //     seats: 900,
    //     color: "#8f1ed6",
    //   },{
    //     id: 6,
    //     name: "Gathering Field",
    //     seats: 900,
    //     color: "#8f1ed6",
    //   },{
    //     id: 6,
    //     name: "Gathering Field",
    //     seats: 900,
    //     color: "#8f1ed6",
    //   },{
    //     id: 6,
    //     name: "Gathering Field",
    //     seats: 900,
    //     color: "#8f1ed6",
    //   },
    // ];
  }, []);

  const onClickIcon = (rowData) => {
    // console.log(rowData);
    // <AddToProject type={"icon"} record={rowData} />;
    setUserData({
      Role_id: rowData.roleId,
      level_id: rowData.levelId,
      skill_id: rowData.skillId,
      id: rowData.id,
      Department_id:rowData.unit.substring(2,4),
      User_id:rowData.User_id
    });
    // setUserData(rowData.role,rowData.level,rowData.SkillName)
    // <Link to={<AddToProject record={rowData}/>} > e</Link>
  };
  const [userData, setUserData] = useState({
    role: "",
    level: "",
    skill: "",
    id: "",
    department_id:""
  });
  const renderCustomResource = (resource) => {
    return (
      <div className="md-resource-header-template-cont">
        {user?.UserType == "leader" ? (
          <div className="md-resource-header-template-icon">
            <span onClick={() => onClickIcon(resource)}>
              <AddToProject type={"icon"} record={userData} />
              {/* <span onClick={() => onClickIcon(resource)}>
            <PersonAddAlt1Icon />
          </span> */}
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
        {user?.UserType == "leader" ? (
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
    // console.log(switchType);
  };

  return (
    <>
      <Switch
        checkedChildren="month"
        onChange={() => onChangeSwitch()}
        unCheckedChildren="year"
        defaultChecked
      />
      {
        console.log(emps)
      }
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
