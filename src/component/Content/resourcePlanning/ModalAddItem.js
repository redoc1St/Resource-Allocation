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
} from "antd";
import { Modal, Table } from "antd";
import { display, height } from "@mui/system";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import request from "../../../../src/api/request";
import { useParams } from "react-router-dom";
import { getRoleByCode } from "../../../Store/Actions/PlanningRoleAction";
import { useDispatch } from "react-redux";

export default function ModalAddRole(record) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const showModal = () => {
    // console.log(record?.record);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };
  // console.log(record.roles);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });
  const { pName } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    // const{pId,unit, pName}= values;
    console.log(values);
    setIsModalOpen(false);
    try {
      const res = await request({
        url: process.env.REACT_APP_BASE_URL+"/api/ResourcePlanning/",
        method: "POST",
        data: { Project_id: record.pId, ...values },
      });

      message.success({
        content: "Add planning role successfully",
        style: { marginTop: "50px" },
      });
      dispatch(getRoleByCode(pName));

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
        width={700}
        title="Add new role planning"
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
                        {...register("Role_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        {record.roles.map((item,index) => {
                          return (
                            <option value={item.Role_id} key={index}>
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
                        {...register("Level_id")}
                        required
                      >
                        <Select.Option required></Select.Option>
                        {record.levels.map((item,index) => {
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
                      <input {...register("Quantity")} />
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
                      <select {...register("Skill_id")} required>
                        <Select.Option required></Select.Option>
                        {record?.skills?.map((item,index) => {
                          return (
                            <option value={item.Skill_id} key={index}>
                              {item.SkillName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        style={{ marginLeft: "50px", marginTop: "30px" }}
                        type="submit"
                      >
                        Add
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
                        type="reset"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </form>
      </Modal>
    </div>
  );
}
