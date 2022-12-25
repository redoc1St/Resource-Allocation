import { Table, Progress } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { red, green, orange } from "@ant-design/colors";
import "./TableData.css";
import { Form, Input } from "antd";
import useAuth from "../hooks/useAuth";
import ModalEditItem from "../Content/MainContent/ModalEditItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  getProjectsByBuId,
  getProjectsByEmp,
  getProjectsByName,
  getProjectsByNameForEmp,
  getProjectsInBUByBuNameNId,
} from "../../Store/Actions/ProjectActions";
import ModalNote from "../Content/MainContent/ModalNote";
import { ROLES } from "../../App";

export default function TableData(sText) {
  const [editRowkey, SetEditRowKey] = useState("");
  const [form] = Form.useForm();
  const { valueInput, user } = useAuth();

  const defaultExpandable = {
    expandedRowRender: (record) => <p>Note: {record.note}</p>,
  };
  const [expandable, setExpandable] = useState(defaultExpandable);

  // const [gridData, setGridData] = useState([]);

  const { onclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);

  let countP = 1;

  useEffect(() => {
    if (user)
      if (valueInput?.prjSearch) {
        if (user?.UserType == ROLES.ADMIN) {
          dispatch(getProjectsByName(valueInput.prjSearch));
        } else if (user?.UserType == ROLES.LEADER) {
          dispatch(
            getProjectsInBUByBuNameNId(
              valueInput?.prjSearch,
              user?.Department_id
            )
          );
        } else {
          dispatch(
            getProjectsByNameForEmp(user?.User_id, valueInput.prjSearch)
          );
        }
      } else {
        if (user?.UserType == ROLES.ADMIN) {
          dispatch(getProjects());
        } else if (user?.UserType == ROLES.LEADER) {
          dispatch(getProjectsByBuId(user?.Department_id));
        } else {
          dispatch(getProjectsByEmp(user?.User_id));
        }
      }
  }, [valueInput?.prjSearch, dispatch, user?.UserType]);
  console.log(projects);

  // var totalAllocate = 0;
  // const AverageAllocate = projects.map((item) => {
  //   return (totalAllocate += item.Effort);
  // });

  const modifiedData = projects.map((item) => ({
    key: item.id,
    pName: <Link to={"/resourcePlaning/" + item.code}>{item.name}</Link>,
    pId: item.code,
    unit: "BU " + item.Department_id,
    plan: (
      ((new Date(item.edp) - new Date(item.sdp)) *
        item.total_Planned_Effort *
        item.total_Planned_Quantity) /
      (3600 * 1000 * 24 * 22 * 100)
    ).toFixed(2),
    actual: (
      ((new Date(item.eda) - new Date(item.sda)) *
        item.total_Actual_Effort *
        item.total_Actual_Quantity) /
      (3600 * 1000 * 24 * 22 * 100)
    ).toFixed(2),
    billable: item.be,
    allocation: (
      <Progress
        percent={Math.floor(
          (Number(
            ((new Date(item.eda) - new Date(item.sda)) *
              item.total_Actual_Effort *
              item.total_Actual_Quantity) /
              (3600 * 1000 * 24 * 22 * 100)
          ) /
            Number(
              ((new Date(item.edp) - new Date(item.sdp)) *
                item.total_Planned_Effort *
                item.total_Planned_Quantity) /
                (3600 * 1000 * 24 * 22 * 100)
            )) *
            100
        )}
        steps={5}
        strokeColor={[red[6], red[6], orange[6], green[6], green[6]]}
      />
    ),

    ...item,
    id: countP++,
    sdp: new Date(item.sdp).toLocaleDateString("es-CL"),
    sda: new Date(item.sda).toLocaleDateString("es-CL"),
    edp: new Date(item.edp).toLocaleDateString("es-CL"),
    eda: new Date(item.eda).toLocaleDateString("es-CL"),
  }));

  const isEditting = (record) => {
    return record.key === editRowkey;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
      width: 50,
    },
    {
      title: "Project ID",
      dataIndex: "pId",

      width: 100,
      sorter: (a, b) => a.pId.localeCompare(b.pId),
    },
    {
      title: "Project Name",
      dataIndex: "pName",
      width: 200,
    },
    {
      title: "Unit",
      dataIndex: "unit",

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
      title: "% Allocation",
      dataIndex: "allocation",
      width: 150,
      fontSize: "10px",

      // fontSize:5
    },
    {
      title: "Planned effort\r\n (MM)",
      dataIndex: "plan",
      width: 110,
    },
    {
      title: "Actual effort\r\n (MM)",
      dataIndex: "actual",
      width: 100,
    },
    {
      title: "Billable effort\r\n (MM)",
      dataIndex: "billable",
      width: 100,
    },
    {
      title: "Start date\r\n (plan) ",
      dataIndex: "sdp",
      width: 130,
      editTable: true,
    },
    {
      title: "Start date\r\n (actual) ",
      dataIndex: "sda",
      width: 130,
    },
    {
      title: "End date\r\n (plan) ",
      dataIndex: "edp",
      width: 130,
    },
    {
      title: "End date\r\n (actual) ",
      dataIndex: "eda",
      width: 130,
    },
    user?.UserType !== ROLES.EMPLOYEE
      ? {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 90,
          render: (_, record) => {
            return (
              <>
                <div style={{ display: "flex" }}>
                  <ModalEditItem data={record} />
                  <ModalNote data={record} />
                </div>
              </>
            );
          },
        }
      : { fixed: "right", width: 20 },
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

  const editableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please input ${title} field`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const tableProps = {
    expandable,
  };
  return (
    <div
    // style={{ minWidth: "1500px", overflowX: "scroll" }}
    >
      <Form form={form} component={false}>
        <Table
          {...tableProps}
          // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
          className="table-striped-rows"
          bordered
          columns={mergedColumns}
          components={{
            body: {
              cell: editableCell,
            },
          }}
          dataSource={modifiedData}
          // className="-striped -highlight"
          // rowClassName={(record) => !record.enabled && "disabled-row"} //dòng này để làm cho disable row
          style={
            onclickShowLeft
              ? {
                  width: "170vh",
                  borderCollapse: "collapse",
                }
              : { width: "200vh" }
          }
          onChange={onChange}
          scroll={{
            // x: 600,
            y: 480,
          }}
          size="small"
        />
      </Form>
    </div>
  );
}
