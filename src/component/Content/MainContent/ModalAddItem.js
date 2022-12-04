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
import { getProjects } from "../../../Store/Actions/ProjectActions";

export default function ModalAddItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  const { moreRow, setMoreRow } = useAuth();
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

  const { register, handleSubmit } = useForm({
    defaultValues: {
      // pId:'5'
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const onSubmit = async (values) => {
    const {
      code,
      projectName,
      department_id,
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
    console.log(values);
    if (Date.parse(start_plan) >= Date.parse(end_plan)) {
      setError("End date (plan) must greater than start date (plan)");
      return;
    } else if (Date.parse(start_actual) >= Date.parse(end_actual)) {
      setError("End date (actual) must greater than start date (actual)");
      return;
    } else
      try {
        const res = await request({
          url: process.env.REACT_APP_BASE_URL + "/api/project",
          method: "POST",
          data: {
            code: JSON.parse(JSON.stringify(code)).trim(),
            projectName: JSON.parse(JSON.stringify(projectName)),
            department_id: JSON.parse(JSON.stringify(department_id)),
            effort_planned: JSON.parse(JSON.stringify(effort_planned)),
            effort_actual: JSON.parse(JSON.stringify(effort_actual)),
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
          dispatch(getProjects());
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
                    <td>Project ID</td>
                    <td>
                      <input required {...register("code")} />
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Unit *</td>
                    <td>
                      <select
                        placeholder="Choose Unit"
                        {...register("department_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        <option value="1">Bu 1</option>
                        <option value="2">Bu 2</option>
                        <option value="3">Bu 3</option>
                        <option value="4">Bu 4</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
                <tbody>
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
                </tbody>
                <tbody>
                  <tr>
                    <td>Start date (plan) </td>
                    <td>
                      <input
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
                <tbody>
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
                </tbody>
                <tbody>
                  <tr>
                    <td>Billable effort *</td>
                    <td>
                      <input
                        type="number"
                        {...register("effort_billable")}
                        min={0}
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