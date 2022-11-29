import React, { useEffect, useState } from "react";
import { Col, message, Row, Select } from "antd";
import { Alert } from "antd";

import { Modal } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoleByCode } from "../../../../../Store/Actions/PlanningRoleAction";

export default function ModalEditPlan(record) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roles = useSelector((state) => state.ExtraObject.roles);
  const levels = useSelector((state) => state.ExtraObject.levels);
  const skills = useSelector((state) => state.ExtraObject.skills);
  const [error, setError] = useState();

  const { pName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const showModal = () => {
    // console.log(record?.record.id)
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
      Effort_planned: record?.record?.Effort_planned,
      Effort_actual: record?.record?.Effort_actual,
      Quantity: record?.record?.Quantity,
      LevelName: record?.record?.Level_id,
      SkillName: record?.record?.Skill_id,
      Bill_rate: record?.record?.Bill_rate,
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
            `/api/ResourcePlanning/${record?.record.id}`,
          method: "PUT",
          data: {
            Quantity: values.Quantity,
            Date_start: values.Date_start,
            Date_end: values.Date_end,
            Effort_planned: values.Effort_planned,
            Bill_rate: values.Bill_rate,
            Level_id: values.LevelName,
            Skill_id: values.SkillName,
          },
        });
        setIsModalOpen(false);
        dispatch(getRoleByCode(pName));
        // dispatch(getProjectsByName(valueInput ? valueInput : ""));
        message.success({
          content: "Edit role planning successfully",
          style: { marginTop: "50px" },
        });
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <span onClick={showModal}>Edit</span>,
      <Modal
        // style={{color:'#424a80'}}
        width={700}
        title="Edit role planning"
        open={isModalOpen}
        // onOk={handleCreate}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Role</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        disabled
                      >
                        <Select.Option required></Select.Option>
                        {roles.map((item, index) => {
                          return (
                            <option value={item.RoleName} key={index}>
                              {item.RoleName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
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
                    <td>% planned effort </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        {...register("Effort_planned")}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Level</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("LevelName")}
                        required
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
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <td>Quantity</td>
                    <td>
                      <input type={'number'} {...register("Quantity")} />
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
                        min={0}
                        // placeholder="0"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Skill</td>
                    <td>
                      <select {...register("SkillName")} required>
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
