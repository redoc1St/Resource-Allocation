import { message, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralRequest, getGeneralRequestByBU } from "../../../../Store/Actions/GenRequestActions";
import useAuth from "../../../hooks/useAuth";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { Divider, Tag } from "antd";
import request from "../../../../../src/api/request";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { ROLES } from "../../../../App";

export default function GeneralRequests() {
  const dispatch = useDispatch();
  const genRequests = useSelector((state) => state.GenRequest.genRequests);
  // const genRequestsByBU = useSelector((state) => state.GenRequest.genRequestsByBU);
  
  // dispatch(getGeneralRequest())
  // console.log(genRequests);
  const { user } = useAuth();

  useEffect(() => {
    if(user?.UserType=='leader'){
dispatch(getGeneralRequestByBU(user?.Department_id))
    }else{
      dispatch(getGeneralRequest());
    }
    
  }, [dispatch]);
  // console.log(genRequests);
  const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: 50,
    },

    {
      title: "Project",
      dataIndex: "ProjectName",
      width: 150,
      //   editTable: true,
    },
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 90,
      //   editTable: true,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      width: 90,
    },

    {
      title: "Start date",
      dataIndex: "Date_start",
      width: 130,
    },
    {
      title: "End date",
      dataIndex: "Date_end",
      width: 130,
    },

    {
      title: "% Effort",
      dataIndex: "Effort_planned",
      width: 90,
    },

    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 90,
    },
    {
      title: "Level",
      dataIndex: "LevelName",
      width: 80,
    },
    {
      title: "Skill",
      dataIndex: "SkillName",
      width: 80,
    },
    {
      title: "Requester",
      dataIndex: "requester",
      width: 100,
    },
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
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 130,
      render: (_, record) => {
        // return <DotAction />;
      },
    },
  ];
  let countReqs = 0;

  const handleAcpt = (id) => {
    return (
      <>
        {console.log(id)}
        <div style={{ textAlign: "center" }}>
          <HowToRegRoundedIcon
            onClick={() => handleAccept({ status: "Approved", id: id })}
            style={{ color: "green", cursor: "pointer" }}
          />

          <CancelRoundedIcon
            onClick={() => handleAccept({ status: "Reject", id: id })}
            style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
          />
        </div>
      </>
    );
  };
  const handleAccept = async (value) => {
    console.log(value);
    // if (value === "accepted") {

    //   setStatus("accepted");
    // } else if (value === "rejected") {
    //   setStatus("rejected");
    // }
    try {
      const res = await request({
        url:
          process.env.REACT_APP_BASE_URL +
          `/api/Request/RolePlanning/${value.status}`,
        method: "POST",
        data: { resourceRole_id: value.id },
      });

      message.success({
        content: value.status + " successfully",
        style: { marginTop: "50px" },
      });
      if(user?.UserType==ROLES.LEADER){
        dispatch(getGeneralRequestByBU(user?.Department_id))

      }else 
      dispatch(getGeneralRequest())

      // setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const modifiedData = genRequests.map((item) => ({
    key: item.ResourcePlannig_RoleId,
    no: (countReqs += 1),
    ...item,
    Status:
      // user?.UserType != "leader" ?
         item.Status === "In Progress"
          // ? <Tag style={{width:'85px',textAlign:'center'}} color="#DEDA23">In Progress</Tag>
          // : 
          // item.Status
        // : item.Status === "In Progress"
        ?
         handleAcpt(item.id)
        : item.Status,
    
        // Status:
        // user?.UserType != "leader" ?
        //    item.Status === "In Progress"
        //     ? <Tag style={{width:'85px',textAlign:'center'}} color="#DEDA23">In Progress</Tag>
        //     : 
        //     item.Status
        //   : item.Status === "In Progress"
        //   ?
        //    handleAcpt(item.id)
        //   : item.Status,
  }));
  return (
    <div>
      {/* {console.log(data)} */}
      <Table
        columns={columns}
        scroll={{
          // x: 600,
          y: 300,
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
        className="-striped -highlight"
        //   dataSource={data}
        size="small"
      ></Table>

    </div>
  );
}
