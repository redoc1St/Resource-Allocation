import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Card,
} from "antd";

import { Modal, Table } from "antd";
import { display, height } from "@mui/system";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";

import {
  getLeaderByCode,
  getLevels,
  getRoles,
  getSkills,
} from "../../../../../Store/Actions/ExtraObjectActions";
import { getResourcePoolEmp } from "../../../../../Store/Actions/ResourcePoolAction";
export default function ModalEditPoolEmp(record) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roles = useSelector((state) => state.ExtraObject.roles);
  const levels = useSelector((state) => state.ExtraObject.levels);
  const skills = useSelector((state) => state.ExtraObject.skills);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  console.log(record?.record);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLevels());
    dispatch(getSkills());
  }, []);
  // console.log(record?.record)
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
      Date_start: record?.record?.Date_start,
      Date_end: record?.record?.Date_end,
      Effort: record?.record?.Effort,
      RoleName: record?.record?.Role_id,
      LevelName: record?.record?.level_id,
      SkillName: record?.record?.skill_id,
      Bill_rate: record?.record?.Bill_rate,
      Fullname: record?.record?.Fullname,
      ProjectName: record?.record?.ProjectName,
      // sdp: record?.data?.sdp,
      // unit: record?.data?.unit,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const onSubmit = async (values) => {
    // const{pId,unit, pName}= values;
    // record?.record.id
    console.log(values);
    if (Date.parse(values.Date_start) >= Date.parse(values.Date_end)) {
      setError("End date must greater than start date");
      return;
    } else
      try {
        const res = await axios({
          url:
            process.env.REACT_APP_BASE_URL +
            `/api/ResourcePool/update`,
          method: "PUT",
          data: {
            resourceRole_id:record?.record?.ResourcePlannig_RoleId,
            employee_id:record?.record?.Employee_id,
            Date_start: values.Date_start,
            Date_end: values.Date_end,
            Effort: values.Effort,
            Bill_rate: values.Bill_rate,
          },
        });
        dispatch(getResourcePoolEmp());

        message.success({
          content: "Edit resource pool successfully",
          style: { marginTop: "50px" },
        });
      } catch (err) {
        console.log(err);
      }
      setIsModalOpen(false);

  };

  return (
    <div>
      <span onClick={showModal}>Edit</span>,
      <Modal
        // style={{color:'#424a80'}}
        width={700}
        title="Edit Resource Pool Employee"
        open={isModalOpen}
        // onOk={handleCreate}
        footer={null}
        onCancel={handleCancel}
      >
        {/* <Card style={{width:'600px'}}> */}
        <div style={{ textAlign: "center" }}>
          <h5>
            Role: {record?.record?.RoleName}&nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; Level: {record?.record?.LevelName}&nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp; Skill: {record?.record?.SkillName}
          </h5>
        </div>
        {/* </Card> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        disabled
                        {...register("Fullname")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Role</td>
                    <td>
                      <select disabled {...register("RoleName")}>
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
                  </tr> */}
                  <tr>
                    <td>Start date </td>
                    <td>
                      <input
                        // value={data?.data?.sdp}
                        type="date"
                        {...register("Date_start")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Effort </td>
                    <td>
                      <input type="number" min={0} max={100} {...register("Effort")} />
                    </td>
                  </tr>

                  {/* <tr>
                    <td>Level</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("LevelName")}
                        required
                        disabled
                        // defaultValue={3}
                      >
                        <Select.Option required></Select.Option>
                        {levels.map((item, index) => {
                          return (
                            <option value={item.Level_id} key={index}>
                              {item.LevelName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </Col>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Project Name</td>
                    <td>
                      <input disabled {...register("ProjectName")} />
                    </td>
                  </tr>
                  <tr>
                    <td>End date </td>
                    <td>
                      <input
                        // value={data?.data?.sdp}
                        type="date"
                        {...register("Date_end")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>% Bill</td>
                    <td>
                      <input
                        type="number"
                        {...register("Bill_rate")}
                        min={0} max={100}
                        // placeholder="0"
                        required
                      />
                    </td>
                  </tr>

                  {/* <tr>
                    <td>Skill</td>
                    <td>
                      <select disabled {...register("SkillName")} required>
                        <Select.Option required></Select.Option>
                        {skills.map((item, index) => {
                          return (
                            <option value={item.Skill_id} key={index}>
                              {item.SkillName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr> */}
                </tbody>
              </table>
              <button
                style={{ marginLeft: "50px", marginTop: "30px" }}
                type="submit"
              >
                Edit
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
                type="button"
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
