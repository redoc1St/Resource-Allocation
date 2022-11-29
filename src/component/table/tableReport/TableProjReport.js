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

export default function TableProjReport() {
  const [editRowkey, SetEditRowKey] = useState("");
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

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // console.log(dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
  
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,

    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
      
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            // console.log("dataindex"+e.target.value)
          }
          
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      // (console.log(
      //   )),
      record[dataIndex]?.props?.children
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
    render: (text) =>

      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text?.props?.children : ""}       //chỗ này tìm mãi
        />
        // {/* <Link to={"/resourcePlaning/" }>{text?.props?.children}</Link>  */}

      ) : (
        text
      ),
  });

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
    pName: <Link to={"resourcePlaning/" + item.code}>{item.name}</Link>,
    pId: item.code,
    unit: "BU " + item.Department_id,
    plan: item.pe,
    actual: item.ae,
    billable: item.be,
    allocation: (
      <Progress
 width={30}
        // style={{width:'200px'}}
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
      ...getColumnSearchProps("pName"),
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
      title: "% Allocation",
      dataIndex: "allocation",
      width: 250,
      fontSize: "400px",
      fixed: "right",

      // fontSize:5
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
          pagination={{ pageSize: 20 }}

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
            y: 400,
          }}
          size="small"
        />
      </Form>
    </div>
  );
}
