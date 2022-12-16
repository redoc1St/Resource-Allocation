import React, { useEffect, useState } from "react";
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
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import {
  getAllEmps,
  getAllEmpsByBU,
  getLevels,
  getRoles,
  getSkills,
} from "../../../../Store/Actions/ExtraObjectActions";
import {
  getResourcePoolEmp,
  getResourcePoolEmpByRLK,
} from "../../../../Store/Actions/ResourcePoolAction";
import { ROLES } from "../../../../App";

export default function ModalAddPool(data) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data[0], data[1], data[2]);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  const { user } = useAuth();
  const [error, setError] = useState();
  const roles = useSelector((state) => state.ExtraObject.roles);
  const levels = useSelector((state) => state.ExtraObject.levels);
  const skills = useSelector((state) => state.ExtraObject.skills);
  const allEmps = useSelector((state) => state.ExtraObject.allEmps);
  const allEmpsByBU = useSelector((state) => state.ExtraObject.allEmpsByBU);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLevels());
    dispatch(getSkills());
    if (user?.UserType == ROLES.LEADER) {
      dispatch(getAllEmpsByBU(user?.Department_id));
    } else {
      dispatch(getAllEmps());
    }
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      // pId:'5'
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });
  const onSubmit = async (values) => {
    console.log(values);
    if (Date.parse(values.Date_start) >= Date.parse(values.Date_end)) {
      setError("End date (plan) must greater than start date (plan)");
      return;
    } else
      try {
        const res = await axios({
          url: process.env.REACT_APP_BASE_URL + "/api/ResourcePool",
          method: "POST",
          data: { ...values, project_id: 1 },
        });
        if (res.data == "Added Successfully") {
          message.success({
            content: "Add project successfully",
            style: { marginTop: "50px" },
          });
        } else if (res.data == "FAILS") {
          message.error({
            content: " Employee with this role,level,skill already exist ",
            style: { marginTop: "50px" },
          });
        }
        if (Object.keys(data).length !== 0) {
          getResourcePoolEmpByRLK(data[0], data[1], data[2]);
        } else {
          dispatch(getResourcePoolEmp());
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
        title="Create new resource pool employee"
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
                    <td>Employee name</td>

                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("Employee_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        {allEmps?.map((item, index) => {
                          return (
                            <option value={item.User_id} key={index}>
                              {item.Username}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Role</td>

                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("Role_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        {roles.map((item, index) => {
                          return (
                            <option value={item.Role_id} key={index}>
                              {item.RoleName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Effort</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        {...register("Effort")}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Start date </td>
                    <td>
                      <input
                        type="date"
                        {...register("Date_start")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </Col>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Level</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("Level_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        {levels?.map((item, index) => {
                          return (
                            <option value={item.Level_id} key={index}>
                              {item.LevelName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Skill</td>
                    <td>
                      <select {...register("Skill_id")} required>
                        <Select.Option required></Select.Option>
                        {skills?.map((item, index) => {
                          return (
                            <option value={item.Skill_id} key={index}>
                              {item.SkillName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>

                  {/* <tr>
                    <td>Bill_rate</td>
                    <td>
                      <input
                        type="number"
                        {...register("Bill_rate")}
                        min={0}
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>End date</td>
                    <td>
                      <input
                        type="date"
                        {...register("Date_end")}
                        placeholder="dd/MM/YYYY"
                        format={"YYYY/MM/DD"}
                        required
                      />
                    </td>
                  </tr>
                  <tr></tr> */}
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
