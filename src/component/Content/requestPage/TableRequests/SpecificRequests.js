import { message, Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecRequest,
  getSpecRequestByBU,
} from "../../../../Store/Actions/SpecRequestActions";
import useAuth from "../../../hooks/useAuth";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import request from "../../../../../src/api/request";
import { Tag } from "antd";
import { ROLES } from "../../../../App";

export default function SpecificRequests() {
  const dispatch = useDispatch();
  const { setAccount, onclickShowLeft, user } = useAuth();

  const specRequests = useSelector((state) => state.SpecRequest.specRequests);
  useEffect(() => {
    console.log(user);
    if (user?.UserType == "leader") {
      dispatch(getSpecRequestByBU(user?.Department_id));
    } else {
      dispatch(getSpecRequest());
    }
  }, [dispatch]);
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 50,
    },

    {
      title: "Employee",
      dataIndex: "Username",
      width: 100,
      //   editTable: true,
    },
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 90,
      //   editTable: true,
    },
    {
      title: "To unit",
      dataIndex: "Department_name",
      width: 70,
    },
    {
      title: "Project",
      dataIndex: "ProjectName",
      width: 150,
    },
    {
      title: "Start date",
      dataIndex: "request_start",
      width: 130,
    },
    {
      title: "End date",
      dataIndex: "request_end",
      width: 130,
    },

    {
      title: "% Effort",
      dataIndex: "request_effort",
      width: 90,
    },

    {
      title: "Bill/Unbill",
      dataIndex: "request_bill",
      width: 90,
    },

    {
      title: "Skill",
      dataIndex: "SkillName",
      width: 80,
    },
    // {
    //   title: "Requester",
    //   dataIndex: "requester",
    //   width: 100,
    // },
    {
      title: "Time",
      dataIndex: "lastestTime",
      width: 130,
      fixed: "right",
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: 100,
      fixed: "right",
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   fixed: "right",
    //   width: 130,
    //   render: (_, record) => {
    //     // return <DotAction />;
    //   },
    // },
  ];
  console.log(specRequests);

  const handleAcpt = (item) => {
    return (
      <>
        {console.log(item)}
        <div style={{ textAlign: "center" }}>
          <HowToRegRoundedIcon
            onClick={() => handleAccept({ status: "Approved", item: item })}
            style={{ color: "green", cursor: "pointer" }}
          />

          <CancelRoundedIcon
            onClick={() => handleAccept({ status: "reject", item: item })}
            style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
          />
        </div>
      </>
    );
  };

  const handleAccept = async (value) => {
    console.log(value.item.Username);
    // console.log(new Date(value.item.request_start).toLocaleDateString("en-US"));
    try {
      const res = await request({
        url:
          process.env.REACT_APP_BASE_URL +
          `/api/Request/EmpToRole/${value.status}/noti/${value.item.Employee_id1}/${value.item.Username}/${value.item.ProjectName}`,
        method: "POST",
        data: {
          resourceRole_id: value?.item?.ResourcePlannig_RoleId,
          employee_id: value?.item?.Employee_id,
          Date_start: new Date(value.item.request_start).toLocaleDateString(
            "en-US"
          ),
          Date_end: new Date(value.item.request_end).toLocaleDateString(
            "en-US"
          ),
          Effort: value.item.request_effort,
          Bill_rate: value.item.request_bill,
        },
      });

      if (res.data == "Added Successfully") {
        message.success({
          content: "Add employee successfully",
          style: { marginTop: "50px" },
        });
      } else if (res.data == "FAILS") {
        message.error({
          content: "Employee has existed in this project",
          style: { marginTop: "50px" },
        });
      }
      // dispatch(getSpecRequest());
      if (user.UserType == ROLES.LEADER) {
        dispatch(getSpecRequestByBU(user?.Department_id));
      } else {
        dispatch(getSpecRequest());
      }

      // setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  let countReqs = 0;

  const modifiedData = specRequests.map((item, id) => ({
    key: id,
    no: (countReqs += 1),
    ...item,
    Department_name: "BU " + item.Depeartment_id,
    request_start: new Date(
      item.request_start.substring(0, 10)
    ).toLocaleDateString("es-CL"),
    request_end: new Date(item.request_end.substring(0, 10)).toLocaleDateString(
      "es-CL"
    ),

    // Status:
    //   user?.UserType != "leader" ? (
    //     item.Status === "In Progress" ? (
    //       <Tag style={{ width: "85px", textAlign: "center" }} color="#DEDA23">
    //         In Progress
    //       </Tag>
    //     ) : (
    //       item.Status
    //     )
    //   ) : item.Status === "In Progress" ? (
    //     handleAcpt(item)
    //   ) : (
    //     item.Status
    //   ),

    ///cmt

    Status:
      // user?.UserType != "leader" ?
      item.Status === "In Progress"
        ? // ? <Tag style={{width:'85px',textAlign:'center'}} color="#DEDA23">In Progress</Tag>
          // :
          // item.Status
          // : item.Status === "In Progress"
          handleAcpt(item)
        : item.Status,
  }));

  return (
    <div>
      {/* {console.log(data)} */}
      <Table
        columns={columns}
        scroll={{
          // x: 600,
          y: 500,
        }}
        dataSource={modifiedData}
        style={
          onclickShowLeft
            ? {
                width: "170vh",
                marginTop: "20px",
              }
            : { width: "200vh" }
        }
        className="table-striped-rows"
        //   dataSource={data}
        size="small"
      ></Table>
    </div>
  );
}
