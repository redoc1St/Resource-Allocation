import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Progress, Popconfirm } from "antd";
import { red, green } from "@ant-design/colors";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  getProjects,
  getProjectsByName,
} from "../../../Store/Actions/ProjectActions";
import { Button, DatePicker, Space, version, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getByEmp } from "../../../Store/Actions/ReportActions";
export default function TableEmpReport() {
  const [editRowkey, SetEditRowKey] = useState("");
  const [form] = Form.useForm();
  const { valueInput, setValueInput } = useAuth();
  const defaultExpandable = {
    expandedRowRender: (record) => <p>Note: ...</p>,
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // useAuth();
  const { onclickShowLeft, setOnclickShowLeft } = useAuth();
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch();
  // const projects = useSelector((state) => state.Projects.projects);
  const employees = useSelector((state) => state.Report.emps);
  const projects = useSelector((state) => state.Projects.projects);

  let countP = 1;
  // let totalRow= projects.length
  const [listProjectName, setListProjectName] = useState([]);
// const listProjectName=[];
  useEffect(() => {
    dispatch(getByEmp());
    dispatch(getProjects());
    listPName()
  }, []);
  
  const listPName = (e)=>{
    e?.stopPropagation()
    console.log('hello');

    for (let i = 0; i < projects.length; i++) {
      // setListProjectName(current=>[...current,{text:projects[i].name,value:projects[i].name}])
      listProjectName.push({text:projects[i].name,value:projects[i].name})
    }
  }
 
  const modifiedData = employees.map((item, index) => ({
    key: index,
    // pName: item,
    employee: item.Fullname,
    pId: item.code,
    unit: "BU " + item.Department_id,
    plan: item.pe,
    actual: item.ae,
    billable: item.be,

    ...item,
    id: countP++,
  }));

  const isEditting = (record) => {
    return record.key === editRowkey;
  };


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
      width: 50,
    },
    {
      title: "Employee",
      dataIndex: "employee",
      width: 150,
      sorter: (a, b) => a.employee.localeCompare(b.employee),

      // editTable:true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.unit - b.unit,
      width: 70,

      filters: [
        {
          text: "BU 1",
          value: "BU 1",
        },
        {
          text: "BU 2",
          value: "BU 2",
        },
        {
          text: "BU 3",
          value: "BU 3",
        },
        {
          text: "BU 4",
          value: "BU 4",
        },
        {
          text: "BU 5",
          value: "BU 5",
        },
      ],
      onFilter: (value, record) => record.unit.indexOf(value) === 0,
    },
    {
      title: "Project Name",
      dataIndex: "ProjectName",
      key: "name",
      width: "150px",
      filters:listProjectName.map(item=>({...item})),
      onFilter: (value, record) => record.ProjectName.indexOf(value) === 0,
    },
    {
      title: "Role",
      dataIndex: "RoleName",
      key: "role",
    },
    {
      title: "Level",
      dataIndex: "LevelName",
      key: "level",
    },
    {
      title: "Skill",
      dataIndex: "SkillName",
      key: "skill",
    },
    {
      title: "Start Date",
      dataIndex: "Date_start",
      key: "sDate",
      // width:'100px'
    },
    {
      title: "End Date",
      dataIndex: "Date_end",
      key: "eDate",
    },
    {
      title: "% Effort",
      dataIndex: "Effort",
      key: "effort",
    },
    {
      title: "% Billable",
      dataIndex: "Bill_rate",
      key: "billable",
    },
    {
      title: "PM",
      dataIndex: "pm",
      key: "pm",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //// no important

  const mergedColumns = columns.map((col) => {
    // console.log(col.dataIndex);
    if (!col.editTable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditting(record),
      }),
    };
  });

  return (
    <div
    // style={{ minWidth: "1500px", overflowX: "scroll" }}
    >
      <Form form={form} component={false}>
        <Table
          // height='500px'
          className="table-striped-rows"
          bordered
          columns={mergedColumns}
          dataSource={modifiedData}
          style={
            onclickShowLeft
              ? {
                  width: "170vh",
                }
              : { width: "200vh" }
          }
          pagination={{ pageSize: 20 }}
          onChange={onChange}
          scroll={{
            // x: 900,
            y: 400,
          }}
          size="small"
        />
        {console.log(listProjectName)}
      </Form>
    </div>
  );
}
