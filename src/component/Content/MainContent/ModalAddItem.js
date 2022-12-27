import React, { useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
} from "antd";
import { Alert } from "antd";

import { Modal } from "antd";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";
import axios from "../../../../src/api/request";
import request from "../../../../src/api/request";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  getProjectsByBuId,
} from "../../../Store/Actions/ProjectActions";
import { ROLES } from "../../../App";

export default function ModalAddItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function delSpace(string) {
    let str1Arr = string.split(" ");
    str1Arr = str1Arr.filter((item) => {
      if (item !== " ") return item;
    });
    return str1Arr.join(" ");
  }
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  const { user } = useAuth();
  const [error, setError] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      unit: user?.Department_id,
      // pId:'5'
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });
  console.log(typeof user?.Department_id);
  function getCodePrj(name) {
    const prjCode =
      name.replace(/ /g, "").replace(/[a-z]/g, "") +
      "_" +
      Math.floor(Math.random() * 1000);
    return prjCode;
  }

  const onSubmit = async (values) => {
    const {
      code,
      projectName,
      unit,
      effort_planned,
      effort_actual,
      effort_billable,
      start_plan,
      start_actual,
      end_plan,
      end_actual,
      quantity_plan,
      quantity_actual,
    } = values;
    // console.log(values);
    const prjCode = getCodePrj(projectName);
    if (Date.parse(start_plan) >= Date.parse(end_plan)) {
      setError("End date (plan) must greater than start date (plan)");
      return;
    } else if (Date.parse(start_actual) >= Date.parse(end_actual)) {
      setError("End date (actual) must greater than start date (actual)");
      return;
    } else
      try {
        // console.log(prjCode);
        const res = await request({
          url: process.env.REACT_APP_BASE_URL + "/api/project",
          method: "POST",
          data: {
            code: prjCode,
            projectName: JSON.parse(JSON.stringify(delSpace(projectName))),
            department_id: JSON.parse(JSON.stringify(unit)),
            effort_planned: JSON.parse(JSON.stringify(0)),
            effort_actual: JSON.parse(JSON.stringify(0)),
            effort_billable: JSON.parse(JSON.stringify(effort_billable)),
            start_plan: JSON.parse(JSON.stringify(start_plan)),
            start_actual: JSON.parse(JSON.stringify(start_actual)),
            end_plan: JSON.parse(JSON.stringify(end_plan)),
            end_actual: JSON.parse(JSON.stringify(end_actual)),
            note: "",
          },
        });
        if (res.data == "Added Successfully") {
          message.success({
            content: "Add project successfully",
            style: { marginTop: "50px" },
          });
          // dispatch(getProjects());
          user?.UserType !== ROLES.ADMIN
            ? dispatch(getProjectsByBuId(user?.Department_id))
            : dispatch(getProjects());
        } else if (res.data == "FAILS") {
          message.error({
            content: "Project ID already exist",
            style: { marginTop: "50px" },
          });
        }

        setIsModalOpen(false);
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <span
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={showModal}
      >
        + Add Item
      </span>
      <Modal
        // style={{color:'#424a80'}}
        title="Create new project"
        open={isModalOpen}
        width={700}
        // onOk={handleCreate}
        onCancel={handleCancel}
        footer={null}
        closable={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Project Name *</td>
                    <td>
                      <input
                        {...register("projectName")}
                        maxLength="50"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
                {/* <tbody>
                  <tr>
                    <td>Project ID</td>
                    <td>
                      <input required {...register("code")} />
                    </td>
                  </tr>
                </tbody> */}
                <tbody>
                  <tr>
                    <td>Unit *</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        {...register("unit")}
                        required
                        // defaultValue={user?.Department_id}
                        disabled={user?.UserType == ROLES.LEADER}
                      >
                        <Select.Option required></Select.Option>
                        <option value="1">Bu 1</option>
                        <option value="2">Bu 2</option>
                        <option value="3">Bu 3</option>
                        <option value="4">Bu 4</option>
                        <option value="5">Bu 5</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
                {/* <tbody>
                  <tr>
                    <td>Actual effort *</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        {...register("effort_actual")}
                        required
                      />
                    </td>
                  </tr>
                </tbody> */}
                <tbody>
                  <tr>
                    <td>Start date (plan) </td>
                    <td>
                      <input
                        max={"3000-12-12"}
                        min={"1900-01-01"}
                        type="date"
                        {...register("start_plan")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Start date (actual)</td>
                    <td>
                      <input
                        max={"3000-12-12"}
                        min={"1900-01-01"}
                        name="sda"
                        type="date"
                        {...register("start_actual")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            <Col span={12}>
              <table>
                {/* <tbody>
                  <tr>
                    <td>Planned effort *</td>
                    <td>
                      <input
                        type="number"
                        {...register("effort_planned")}
                        min={0}
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>
                </tbody> */}
                <tbody>
                  <tr>
                    <td>Billable effort *</td>
                    <td>
                      <input
                        type="number"
                        {...register("effort_billable")}
                        min={0}
                        max={"9999"}
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>End date (plan) </td>
                    <td>
                      <input
                        max={"3000-12-12"}
                        min={"1900-01-01"}
                        type="date"
                        {...register("end_plan")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>End date (actual)</td>
                    <td>
                      <input
                        max={"3000-12-12"}
                        min={"1900-01-01"}
                        type="date"
                        {...register("end_actual")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <button
                style={{ marginLeft: "50px", marginTop: "30px" }}
                type="submit"
              >
                Create
              </button>

              <button
                style={{
                  backgroundColor: "white",
                  color: " #4CAF50",
                  border: "1px solid",
                  marginLeft: "50px",
                  marginTop: "30px",
                }}
                onClick={handleCancel}
                type={"reset"}
              >
                Cancel
              </button>
            </Col>
          </Row>
        </form>
        {error ? (
          <Alert
            style={{ marginTop: "10px" }}
            message={error}
            type={"error"}
            showIcon
          />
        ) : null}
      </Modal>
    </div>
  );
}
