// import "antd/dist/antd.css";

import { Table, Progress, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { InputNumber } from "antd";
import { red, green } from "@ant-design/colors";
import "./TableData.css";
import { Button, DatePicker, Space, version, Form, Input } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useAuth from "../hooks/useAuth";
import ModalEditItem from "../Content/MainContent/ModalEditItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  getProjectsByName,
} from "../../Store/Actions/ProjectActions";

const onChange1 = (value) => {
  console.log("changed", value);
};
const formatUrl = (str) => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "_");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
};

export default function TableData(sText) {
  const [editRowkey, SetEditRowKey] = useState("");
  const [form] = Form.useForm();
  const { valueInput, setValueInput } = useAuth();

  // const [gridData, setGridData] = useState([]);

  useAuth();
  const { onclickShowLeft, setOnclickShowLeft } = useAuth();
const[isUpdated,setIsUpdated]= useState(false)
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
    console.log("assad");
    
  }, [valueInput,dispatch]);



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
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      width: 50,
    },
    {
      title: "Project ID",
      dataIndex: "pId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      width: 100,
      editTable: true,
    },
    {
      title: "Project Name",
      dataIndex: "pName",
      width: 200,
      // editTable:true,

      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.pName.indexOf(value) === 0,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.unit - b.unit,
      width: 50,
    },
    {
      title: "% Allocation",
      dataIndex: "allocation",
      width: 200,
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 175,
      render: (_, record) => {
        // <Link to="/">
        //   <BorderColorIcon />
        // </Link>
        const editable = isEditting(record);
        // console.log(record)
        // return data.length >= 1 ? (
        //   <Space>
        //     {editable ? (
        //       <span>
        //         <Space size="middle">
        //           <Button
        //             onClick={() => save(record.key)}
        //             type="primary"
        //             style={{ marginRight: 8 }}
        //           >
        //             Save
        //           </Button>
        //           <Popconfirm title="Are you sure to cancel" onConfirm={cancel}>
        //             <Button>Cancel</Button>
        //           </Popconfirm>
        //         </Space>
        //       </span>
        //     ) : (
        //       <Button style={{ border: "0" }} onClick={() => edit(record)}>
        //         <BorderColorIcon />
        //       </Button>
        //     )}
        //   </Space>
        // ) : null;
        return <ModalEditItem data={record} />;
      },
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

  return (
    <div
    // style={{ minWidth: "1500px", overflowX: "scroll" }}
    >
      <Form form={form} component={false}>
        {console.log(projects)}
        <Table
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
  );
}
