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
      dataIndex: "ActualQuantity",
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
      dataIndex: "Effort_actual",
      width: 80,
    },
    {
      title: "Bill/Unbill",
      dataIndex: "bill",
      width: 100,
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
    }
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

  const ar = [1, 2, 3, 4];
  const mergedData2 = mergedData.map((item, index) =>
    index > 0
      ? {
          key: item.id,
          ...item,
          ActualQuantity: ar[0]++,
          status: item.Status,
        }
      : {
          key: 0,
          RoleName: "Total",
          Quantity: planningRoles[planningRoles.length - 1]?.totalPQuantity,
        }
  );
  return (
    <div>
      <Table
        className="-striped -highlight"
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

      >
        {/* <Column width="100px" title="Role" dataIndex="RoleName" key="role" />

        <ColumnGroup title="PLANNED">
          <Column title="Quantity" dataIndex="Quantity" key="quantity" />
          <Column title="Level" dataIndex="level" key="level" />
          <Column title="Skill" dataIndex="skill" key="skill" />
        </ColumnGroup>
        <ColumnGroup title="ACTUAL">
          <Column title="Quantity" dataIndex="quantity" key="quantity" />
          <Column title="Level" dataIndex="level" key="level" />
          <Column title="Skill" dataIndex="skill" key="skill" />
        </ColumnGroup>
        <Column title="Start date" dataIndex="sDate" key="age" />
        <Column title="End date" dataIndex="address" key="address" />
        <Column title="Status" dataIndex="address" key="address" /> */}

        {console.log(planningRoles)}
      </Table>
    </div>
  );
}
