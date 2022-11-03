import { Table } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecRequest } from '../../../../Store/Actions/SpecRequestActions';
import useAuth from '../../../hooks/useAuth';

export default function SpecificRequests() {

  const dispatch = useDispatch();
  const specRequests = useSelector((state) => state.SpecRequest.specRequests);
  useEffect(() => {
    dispatch(getSpecRequest())
  }, [ dispatch]);
    const { setAccount, onclickShowLeft, setOnclickShowLeft } = useAuth();
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
          title: "Unit",
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
          dataIndex: "Effort",
          width: 90,
        },
    
        {
          title: "Bill/Unbill",
          dataIndex: "bill",
          width: 90,
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
          dataIndex: "status",
          width: 130,
          fixed:'right'
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

      const modifiedData = specRequests.map((item)=>({
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
