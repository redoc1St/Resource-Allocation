import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Card, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRoleByCode } from "../../../../Store/Actions/PlanningRoleAction";
import axios from "axios";
import TableReportRSP from "./TableReportRSP";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export default function ReportRSPLanning() {
  const { pName } = useParams();
  const [getPName, setPName] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRoleByCode(pName));
  }, [pName]);
  useEffect(() => {
    // dispatch(getRoles());
    // dispatch(getLevels());
    // dispatch(getSkills());
    axios
      .get(process.env.REACT_APP_BASE_URL + `/api/${pName}`)
      .then(function (response) {
        // handle success

        // setPID(response.data[0].Project_id);
        setPName(response.data[0].ProjectName);
        // setBU(response.data[0].Depeartment_id);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [pName]);
  return (
    <div>
      <h3 style={{ fontWeight: "bold", color: "#121843" }}>
        Resource Planning
      </h3>
      <h5 style={{ color: "#162274" }}>
      <span onClick={() => navigate(-1)}><ArrowBackIosIcon style={{cursor:'pointer',color:'black'}} /></span> Report | <span style={{ color: "#f66800" }}>{getPName}</span> | Resource Planning
      </h5>
      <div
        className="site-card-border-less-wrapper"
        style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
      >
        {/* <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
          Planned effort
          <br />
          (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
        <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
          Planned effort
          <br />
          (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card>
        <Card
          style={{
            color: "white",
            // border: "10px solid",
            borderRadius: "10px",
            backgroundColor: "#988ff4",
            width: 150,
            height: 120,
            textAlign: "center",
            margin: "0 30px ",
          }}
        >
          Planned effort
          <br />
          (MM)<p style={{ fontSize: "30px" }}>5</p>
        </Card> */}
        {/* <Card
          style={{
            color: "#646464",
            fontWeight: "bold",
            border: "2px solid",
            backgroundColor: "#ededed",
            width: 300,
            height: 140,
          }}
        >
          <p>Planned effort:</p>
          <p>Billable effort:</p>
          <p>Actual effort:</p>
        </Card> */}
        {/* <div style={{ marginLeft: "700px" }}><BtnViewEmp /></div> */}
      </div>

      <div style={{ marginTop: "5px" }}>
      <TableReportRSP/>
        {/* <TableResourcePlanning planningRoles={planningRoles} bu={getBU} /> */}
      </div>
    </div>
  );
}
