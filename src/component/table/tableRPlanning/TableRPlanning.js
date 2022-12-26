import React, { useEffect } from "react";
import { Table } from "antd";
import "./tableRPlanning.css";
import DotAction from "./dotAction/DotAction";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link, useParams } from "react-router-dom";
import { getLeaderByCode } from "../../../Store/Actions/ExtraObjectActions";
import { ROLES } from "../../../App";
export default function TableResourcePlanning(data) {
  const { onclickShowLeft } = useAuth();
  const dispatch = useDispatch();
  const { pName } = useParams();
  const { user } = useAuth();
  // const projects = useSelector((state) => state.Projects.projects);
  // const { quantity, setQuantity } = useAuth();
  const leader = useSelector((state) => state.ExtraObject.leader);
  useEffect(() => {
    dispatch(getLeaderByCode(pName));
    // console.log('here'+data?.planningRoles[data.planningRoles.length - 1]?.totalPQuantity);
  });
  const columns = [
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 100,
    },
    {
      title: "Planned quantity",
      dataIndex: "Quantity",
      width: 75,
      editTable: true,
    },
    {
      title: "Actual quantity",
      dataIndex: "actual",
      width: 75,
      editTable: true,
    },
    {
      title: "Level",
      dataIndex: "LevelName",
      width: 140,
    },
    {
      title: "Skills",
      dataIndex: "SkillName",
      width: 140,
    },
    user?.UserType !== ROLES.EMPLOYEE
      ? {
          title: "Employee",
          dataIndex: "employee",
          width: 85,
          editTable: true,
        }
      : { width: 0 },
    {
      title: "Start date ",
      dataIndex: "Date_start",
      width: 120,
    },

    {
      title: "End date ",
      dataIndex: "Date_end",
      width: 120,
    },
    {
      title: "% Planned effort",
      dataIndex: "Effort_planned",
      width: 90,
    },
    {
      title: "% Actual effort",
      dataIndex: "total_Effort",
      width: 80,
    },
    // {
    //   title: "Bill/Unbill",
    //   dataIndex: "bill",
    //   width: 100,
    // },

    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 60,
    },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 100,
    },
    // user?.UserType !== ROLES.EMPLOYEE
    //   ?
       {
          title: "Action",
          dataIndex: "action",
          fixed: "right",
          width: 70,
        }
      // : { fixed: "right", width: 10 },
  ];

  const mergedData = [
    {
      key: 0,
    },
    ...data.planningRoles,
  ];
// console.log(mergedData);
  var totalPlanAllocate = 0;
  var totalActualAllocate = 0;

  const AverageAllocate = mergedData?.map((item) => {
    return (
      item.Status?.props.children == "Approved"
        ? item.Effort_planned
          ? (totalPlanAllocate += item.Effort_planned)
          : item.Effort_planned
        : "",
      item.total_Effort
        ? (totalActualAllocate += item.total_Effort / item.actual)
        : item.total_Effort
    );
  });
  // console.log(mergedData)
  const ar = [1, 2, 3, 4];
  const mergedData2 = mergedData.map((item, index) =>
    index > 0
      ? {
          key: item.id,
          ...item,
          ActualQuantity: ar[0]++,
          status: item.Status,
          Date_start: new Date(item.Date_start).toLocaleDateString("es-CL"),
          Date_end: new Date(item.Date_end).toLocaleDateString("es-CL"),
          actual: item.actual ? item.actual : "0",
          total_Effort: item.total_Effort
            ? item.total_Effort / item.actual
            : "0",
          action:
            item?.Status?.props?.children === "Rejected" ||
            item?.Status?.props?.children === "In Progress" ? (
              ""
            ) : (
              <DotAction {...data} record={item} leader={leader} />
            ),
          employee:
            item?.Status?.props?.children === "Approved" ? (
              <Link
                to={{
                  pathname: `/resourcePool/${pName}/${item.Role_id}/${item.Level_id}/${item.Skill_id}/${data?.bu}/${item.id}`,
                }}
                state={[
                  item.Role_id,
                  item.Level_id,
                  item.Skill_id,
                  pName,
                  data.bu,
                  item.id,
                  item.ProjectName,
                ]}
              >
                <PersonAddIcon />
              </Link>
            ) : (
              ""
            ),
        }
      : {
          key: 0,
          RoleName: "Total",
          Quantity:
            data?.planningRoles[data.planningRoles.length - 1]?.totalPQuantity,
          actual:
            data?.planningRoles[data.planningRoles.length - 1]?.totalAQuantity,
          // Effort_planned: totalPlanAllocate,
          // total_Effort: totalActualAllocate,
        }
  );

  // console.log(totalActualAllocate);
  // console.log(data);
  data?.sendTotalToParent(
    data?.planningRoles[data.planningRoles.length - 1]?.totalPQuantity,
    data?.planningRoles[data.planningRoles.length - 1]?.totalAQuantity,
    totalPlanAllocate,
    totalActualAllocate
  );

  return (
    <div>
      <Table
        bordered
        className="table-striped-rows"
        columns={columns}
        scroll={{
          // x: 600,
          y: 300,
        }}
        style={
          onclickShowLeft
            ? {
                width: "170vh",
              }
            : { width: "200vh" }
        }
        dataSource={mergedData2}
        size="small"
      ></Table>
    </div>
  );
}
