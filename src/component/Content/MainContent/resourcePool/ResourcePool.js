import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import BasicBreadcrumbs from "../../../breadcrumbs/BasicBreadcrumbs";
import TableRPool from "../../../table/tableRPool/TableRPool";
// import styles from './ResourcePool.css'
import { Radio } from "antd";
import ViewByChart from "./viewByChart/ViewByChart";

export default function ResourcePool(record) {
  const location = useLocation();
  const [value, setValue] = useState('list');

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <h3 style={{ fontWeight: "bold", color: "#121843" }}>
        Resource Pool
        {/* {console.log(location?.state?.record)} */}
      </h3>
      <div style={{ display: "flex" ,  }}>
        <BasicBreadcrumbs />

        <div style={{ marginLeft:'900px'}}>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value='list'  style={{fontWeight: value===1 ? 'bolder':''}}>View by list</Radio>
            <Radio value='chart' style={{fontWeight: value===2 ? 'bolder':''}}>View by chart</Radio>
          </Radio.Group>
        </div>
      </div>
{value==='list'?  <>
  <TablePane>
        <tr>
          <th></th>
          <th></th>
          <th>Unit </th>
          <th>Bill rate</th>
          <th>Bill</th>
          <th>Billable</th>
        </tr>
        <tr>
          <td>Total staff</td>
          <td>0</td>
          <td>Company</td>
          <td>Total staff</td>
          <td>Total staff</td>
          <td></td>
        </tr>
        <tr>
          <td>Target Billable</td>
          <td>%</td>
          <td>Bu1</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Bu2</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </TablePane>
      <TableRPool />
</> : <ViewByChart/>}
      
    </div>
  );
}

const TablePane = styled.table`
  border: 0.5px solid black;
  width: 500px;
  background-color: #ededed;
  th,
  td {
    border: 0.5px solid black;
  }
`;
