import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { getRoleByCode } from "../../../../Store/Actions/PlanningRoleAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const { Column, ColumnGroup } = Table;

export default function TableReportRSP() {
  const { pName } = useParams();
  const { onclickShowLeft, setOnclickShowLeft } = useAuth();
  const planningRoles = useSelector((state) => state.PlanningRoles.roles);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Role",
      dataIndex: "RoleName",
      width: 80,
    },

    // {
    //   title: "Planned quantity",
    //   dataIndex: "pQuantity",
    //   width: 100,
    //   editTable: true,
    // },
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
      width: 130,
    },
    {
      title: "Skills",
      dataIndex: "SkillName",
      width: 130,
    },

    {
      title: "Start date ",
      dataIndex: "Date_start",
      width: 150,
    },

    {
      title: "End date ",
      dataIndex: "Date_end",
      width: 150,
    },
    {
      title: "%Planned effort",
      dataIndex: "Effort_planned",
      width: 85,
    },
    {
      title: "% Actual effort",
      dataIndex: "total_Effort",
      width: 80,
    },

    {
      title: "% Bill",
      dataIndex: "Bill_rate",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 100,
      // render: (_, record) => {
      //   return <DotAction record={record} />;
      // },
    },
  ];
  useEffect(() => {
    dispatch(getRoleByCode(pName));
  }, []);
  const mergedData = [
    {
      key: 0,
    },
    ...planningRoles,
  ];
  console.log(mergedData);
  var totalPlanAllocate = 0;
  var totalActualAllocate = 0;
  var totalActualQuantity = 0;

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
  // console.log();
  const mergedData2 = mergedData.map((item, index) =>
    index > 0
      ? {
          key: item.id,
          ...item,
          status: item.Status,
          actual: item.actual ? item.actual : "0",
          Date_start: new Date(item.Date_start).toLocaleDateString("es-CL"),
          Date_end: new Date(item.Date_end).toLocaleDateString("es-CL"),
          total_Effort: item.total_Effort
            ? item.total_Effort / item.actual
            : "0",
        }
      : {
          key: 0,
          RoleName: "Total",
          actual: totalActualQuantity,
          // Effort_planned: totalPlanAllocate,
          // total_Effort: totalActualAllocate,
          Quantity: planningRoles[planningRoles.length - 1]?.totalPQuantity,
          actual: planningRoles[planningRoles.length - 1]?.totalAQuantity,
        }
  );
  return (
    <div>
      <Table
        className="table-striped-rows"
        bordered
        style={
          onclickShowLeft
            ? {
                width: "170vh",
              }
            : { width: "200vh" }
        }
        scroll={{
          // x: 600,
          y: 250,
        }}
        dataSource={mergedData2}
        columns={columns}
        size="small"
      ></Table>
    </div>
  );
}
