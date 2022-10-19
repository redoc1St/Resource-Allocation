import { Table } from 'antd';
import React from 'react'
import useAuth from '../../../hooks/useAuth';

export default function GeneralRequests() {
    const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
    const columns = [
        {
          title: "No.",
          dataIndex: "no",
          width: 50,
        },
    
        {
          title: "Project",
          dataIndex: "project",
          width: 100,
          //   editTable: true,
        },
        {
          title: "Role",
          dataIndex: "role",
          width: 90,
          //   editTable: true,
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          width: 90,
        },
    
        {
          title: "Start date",
          dataIndex: "sDate",
          width: 130,
        },
        {
          title: "End date",
          dataIndex: "eDate",
          width: 130,
        },
    
        {
          title: "% Effort",
          dataIndex: "pe",
          width: 90,
        },
    
        {
          title: "% Bill",
          dataIndex: "pBill",
          width: 90,
        },
        {
          title: "Level",
          dataIndex: "level",
          width: 80,
        },
        {
          title: "Skill",
          dataIndex: "skill",
          width: 80,
        },
        {
          title: "Requester",
          dataIndex: "requester",
          width: 100,
        },
        {
          title: "Time",
          dataIndex: "time",
          width: 130,
        },
        {
          title: "Status",
          dataIndex: "status",
          width: 130,
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
    return (
        <div>
        {/* {console.log(data)} */}
        <Table
          columns={columns}
          scroll={{
            // x: 600,
            y: 300,
          }}
          style={
              onclickShowLeft
                ? {
                    width: "170vh",
                    marginTop:'20px'
                  }
                : { width: "200vh" }
            }
          className="-striped -highlight"
        //   dataSource={data}
          size="small"
        ></Table>
      </div>
  )
}
