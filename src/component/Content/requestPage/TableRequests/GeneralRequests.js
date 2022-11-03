import { Table } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralRequest } from '../../../../Store/Actions/GenRequestActions';
import useAuth from '../../../hooks/useAuth';

export default function GeneralRequests() {
  
  const dispatch = useDispatch();
  const genRequests = useSelector((state) => state.GenRequest.genRequests);
  // dispatch(getGeneralRequest())

  useEffect(() => {
    dispatch(getGeneralRequest())
  }, [ dispatch]);
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
          fixed:'right'

        },
        {
          title: "Status",
          dataIndex: "Status",
          width: 130,
          fixed:'right',

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

      const modifiedData = genRequests.map((item)=>({
        no:(countReqs+=1),...item
      }))
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
