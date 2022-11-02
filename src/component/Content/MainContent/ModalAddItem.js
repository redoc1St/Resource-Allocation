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
import { Modal, Table } from "antd";
import { display, height } from "@mui/system";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";
import axios from "../../../../src/api/request";
import request from "../../../../src/api/request";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../Store/Actions/ProjectActions";
import Notification from "../../notification/Notification";

export default function ModalAddItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  const { moreRow, setMoreRow } = useAuth();

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
    try {
      const res = await request({
        url: process.env.REACT_APP_BASE_URL+"/api/project",
        method: "POST",
        data: {
          code: JSON.parse(JSON.stringify(code)),
          projectName: JSON.parse(JSON.stringify(projectName)),
          department_id: JSON.parse(JSON.stringify(department_id)),
          effort_planned: JSON.parse(JSON.stringify(effort_planned)),
          effort_actual: JSON.parse(JSON.stringify(effort_actual)),
          effort_billable: JSON.parse(JSON.stringify(effort_billable)),
          start_plan: JSON.parse(JSON.stringify(start_plan)),
          start_actual: JSON.parse(JSON.stringify(start_actual)),
          end_plan: JSON.parse(JSON.stringify(end_plan)),
          end_actual: JSON.parse(JSON.stringify(end_actual)),
        },
      });
      if (res.data.success) {
        // moreRow++;
        // console.log(res.data.success);
        // console.log(moreRow);
        // navigate('/')
      }


      message.success({
        content:"Add project successfully",
        style:{marginTop:'50px'},
      });
      dispatch(getProjects());

      setIsModalOpen(false);

    } catch (err) {
      console.log(err);
    }

    // const { username, password } = values;
    // try {
    //   /// axios
    // } catch (error) {}
    // console.log(username);
    // if (username === accountLogin.username && password === accountLogin.password) {
    //   setAccount(true);
    //   navigate("/resourceAllocation");
    // }
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
                      <input {...register("code")} />
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
                      <input {...register("projectName")} required />
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
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        style={{ marginLeft: "50px", marginTop: "30px" }}
                        type="submit"
                      >
                        Create
                      </button>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* <Form.Item label="Project ID">
                
              </Form.Item> */}
            {/* <Form.Item label="Unit">
              <Select placeholder="Choose Unit">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item> */}
          </Row>
        </form>
      </Modal>
    </div>
  );
}
