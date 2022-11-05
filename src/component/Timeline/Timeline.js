import { Eventcalendar } from '@mobiscroll/react'; /* or import any other component */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Switch, Table } from "antd";
import "./index.css";

import React, { useEffect, useState } from "react";
import { getResourcePoolEmp } from "../../Store/Actions/ResourcePoolAction";
import { useDispatch, useSelector } from "react-redux";

export default function Timeline() {
  //   const [myEvents, setEvents] = React.useState([]);
  const dispatch = useDispatch();
  const emps = useSelector((state) => state.ResourcePool.emps);
  // const [idEmp, setIdEmp]= useState(0);
  useEffect(() => {
    dispatch(getResourcePoolEmp());
  }, []);
  //  let idEmp=0

  const myEvents = React.useMemo(() => {
    return emps.map((item) => ({
      start: item?.Date_start,
      end: item?.Date_end,
      title: item?.ProjectName + "|" + item?.Date_start + "|" + item?.Date_end,
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

  const myResources = React.useMemo(() => {
    return emps.map((item) => ({
      id: item.number,
      name: item?.Username,
      unit: item?.Department_name,
      role: item?.RoleName,
      level: item?.LevelName,
      color: "#3fd890",
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

  //   React.useEffect(() => {
  //     getJson(
  //       "https://trial.mobiscroll.com/daily-weekly-events/",
  //       (events) => {
  //         setEvents(events);
  //       },
  //       "jsonp"
  //     );
  //   }, []);

  const renderCustomResource = (resource) => {
    return (
      <div className="md-resource-header-template-cont">
        <div className="md-resource-header-template-name">{resource.name}</div>
        <div className="md-resource-header-template-unit">{resource.unit}</div>
        <div className="md-resource-header-template-role">{resource.role}</div>
        <div className="md-resource-header-template-level">
          {resource.level}
        </div>
      </div>
    );
  };

  const renderCustomHeader = () => {
    return (
      <div className="md-resource-header-template-title">
        <div className="md-resource-header-template-name">Employee</div>
        <div className="md-resource-header-template-unit">Unit</div>
        <div className="md-resource-header-template-role">Role</div>
        <div className="md-resource-header-template-level">Level</div>
      </div>
    );
  };

  const [switchType, SetSwitchType] = useState(true);
  const onChangeSwitch = () => {
    SetSwitchType(!switchType);
    console.log(switchType);
  };

  return (
    <>
      <Switch
        checkedChildren="month"
        onChange={() => onChangeSwitch()}
        unCheckedChildren="year"
        defaultChecked
      />

      <Eventcalendar
        theme="ios"
        themeVariant="light"
        view={{
          timeline: {
            type:switchType ?  "month" : "year",
            startDay: 1,
            endDay: 5,
            eventList: true,
            weekNumbers: true,
          },
        }}
       
        data={myEvents}
        resources={myResources}
        renderResource={renderCustomResource}
        height='550px'
        renderResourceHeader={renderCustomHeader}
        cssClass="md-resource-header-template"
      />
    </>
  );
}
