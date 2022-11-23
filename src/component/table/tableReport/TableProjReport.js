import React, { useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import { Table, Progress, Popconfirm } from "antd";
import { red, green } from "@ant-design/colors";

import {
    getProjects,
    getProjectsByName,
  } from "../../../Store/Actions/ProjectActions";
import { Button, DatePicker, Space, version, Form, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import useAuth from "../../hooks/useAuth";

export default function TableProjReport() {const [editRowkey, SetEditRowKey] = useState("");
const [form] = Form.useForm();
const { valueInput, setValueInput } = useAuth();
const defaultExpandable = {
  expandedRowRender: (record) => <p>Note: ...</p>,
};
const [expandable, setExpandable] = useState(defaultExpandable);


// useAuth();
const { onclickShowLeft, setOnclickShowLeft } = useAuth();
const [isUpdated, setIsUpdated] = useState(false);
const dispatch = useDispatch();
const projects = useSelector((state) => state.Projects.projects);

let countP = 1;
// let totalRow= projects.length

useEffect(() => {
  if (valueInput) {
    dispatch(getProjectsByName(valueInput));
  } else {
    dispatch(getProjects());
  }
}, [valueInput, dispatch]);

const modifiedData = projects.map((item) => ({
  key: item.id,
  // pName: item,
  pName: <Link to={"/resourcePlaning/" + item.code}>{item.name}</Link>,
  pId: item.code,
  unit: "BU " + item.Department_id,
  plan: item.pe,
  actual: item.ae,
  billable: item.be,
  allocation: (
    <Progress
      // width='100px'
      percent={Math.floor((Number(item.ae) / Number(item.pe)) * 100)}
      steps={5}
      strokeColor={[green[6], green[6], red[5]]}
    />
  ),

  ...item,
  id: countP++,
}));

const isEditting = (record) => {
  return record.key === editRowkey;
};

// const cancel = () => {
//   SetEditRowKey("");
// };
// const save = async (key) => {
//   try {
//     const row = await form.validateFields();
//     const newData = [...data];
//     const index = newData.findIndex((item) => key === item.key);
//     if (index > -1) {
//       const item = newData[index];
//       newData.splice(index, 1, { ...item, ...row });
//       SetEditRowKey("");
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };
// const edit = (record) => {
//   form.setFieldsValue({
//     id: "",
//     pId: "",
//     pName: "",
//     ...record,
//   });
//   SetEditRowKey(record.key);
// };

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
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.age - b.age,
    width: 100,
    sorter: (a, b) => a.pId.localeCompare(b.pId),
    // editTable: true, 
  },
  {
    title: "Project Name",
    dataIndex: "pName",
    width: 200,
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
      },{
        text: "BU 3",
        value: "BU 3",
      },{
        text: "BU 4",
        value: "BU 4",
      },{
        text: "BU 5",
        value: "BU 5",
      },
    ],
    onFilter: (value, record) => record.unit.indexOf(value) === 0
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
  }
  
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
  const input = <Input />;
  const datex = <DatePicker />;
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
              }
            : { width: "200vh" }
        }
        onChange={onChange}
        scroll={{
          // x: 600,
          y: 300,
        }}
        size="small"
      />
    </Form>
  </div>
  )
}
