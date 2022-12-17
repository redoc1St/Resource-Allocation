import React, { useState } from "react";
import BasicBreadcrumbs from "../../breadcrumbs/BasicBreadcrumbs";
import ScrollBar from "react-perfect-scrollbar";
import { Radio, Tabs } from "antd";
import TableProjReport from "../../table/tableReport/TableProjReport";
import TableEmpReport from "../../table/tableReport/TableEmpReport";

export default function Report() {
  const [type, setType] = useState("project");

  const onChange = (e) => {
    setType(e.target.value);
    console.log(type);
    // setSize(e.target.value);
  };
  const TypePicker = () => {
    if (type == "project") {
      return <TableProjReport />;
    } else if (type == "employee") {
      return <TableEmpReport />;
    }
  };
  return (
    <div>
      <div>
        <ScrollBar
          style={{
            overflow: "hidden",
            scrollMarginInlineEnd: "30px",
            width: "1280px",
            height: "700px",
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: "bold",
                color: "#121843",
              }}
            >
              Report
            </h3>
            <div>
              <BasicBreadcrumbs />
              <div style={{ display: "flex" }}>
                <div className="form-group" style={{ marginLeft: "900px" }}>
                  <div style={{ display: "flex" }}>
                    <h5>view by</h5>
                    <Radio.Group
                      size="70px"
                      defaultValue={type}
                      onChange={onChange}
                      style={{ marginBottom: 10, marginLeft: "10px" }}
                    >
                      <Radio.Button value="project">Project</Radio.Button>
                      <Radio.Button value="employee">Employee</Radio.Button>
                      {/* <Radio.Button value="time">Time</Radio.Button> */}
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </div>
            <div>{TypePicker()}</div>
          </div>
        </ScrollBar>
      </div>
    </div>
  );
}
