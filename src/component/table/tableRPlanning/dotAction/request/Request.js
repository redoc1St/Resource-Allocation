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
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import request from "../../../../../../src/api/request";
import { useDispatch, useSelector } from "react-redux";
import { getRoleByCode } from "../../../../../Store/Actions/PlanningRoleAction";
import {
  getLeaderByBU,
  getLeaderByCode,
} from "../../../../../Store/Actions/ExtraObjectActions";
import { fontWeight } from "@mui/system";

export default function Request(record) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const leader = useSelector((state) => state.ExtraObject.leader);
  const { pName } = useParams();
  const { pQuantity, aQuantity, sDate, eDate } = record.record.record;
  const quantity = parseInt(pQuantity) - parseInt(aQuantity);
  useEffect(() => {
    dispatch(getLeaderByBU(record.record.record.Depeartment_id));
  }, [pName]);
  // console.log(leader.Username);  //23-11
  // console.log(record.record.record.ProjectName);
  const showModal = () => {
    setIsModalOpen(true);
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
      requestTo: leader?.Username, //hoặc ntn record.record?.leader?.Username,
      role: record.record.record.RoleName,
      sd: record.record.record.Date_start,
      pe: record.record.record.Effort_planned,
      level: record.record.record.LevelName,

      pName: record.record.record.ProjectName,
      quantity: record.record.record.Quantity,
      ed: record.record.record.Date_end,
      pBill: record.record.record.Bill_rate,
      skill: record.record.record.SkillName,
      // sdp: record?.data?.sdp,
      // unit: record?.data?.unit,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const res = await request({
        url:
          process.env.REACT_APP_BASE_URL +
          `/api/Request/RolePlanning/Noti/${leader.User_id}/${record.record.record.ProjectName}`,
        method: "POST",
        data: {
          resourceRole_id: record.record.record.id,
        },
      });
      // if(res.data)
      message.success({
        content: "Request role planning successfull",
        style: { marginTop: "50px" },
      });
      // dispatch(getProjects());
      dispatch(getRoleByCode(pName));

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <span onClick={showModal}>Request</span>
      <Modal
        width={700}
        title="Create a general request"
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
                    <th>Request to</th>
                    <td>
                      <input
                        style={{ fontWeight: "bold" }}
                        disabled
                        {...register("requestTo")}
                      />
                      {/* <select {...register("request")} required>
                        <Select.Option required></Select.Option>
                        <option defaultValue value="ThaiBA">
                          ThaiBA
                        </option>
                      </select> */}
                    </td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>
                      <input disabled {...register("role")} />

                      {/* <select {...register("role")} disabled required>
                        <Select.Option required></Select.Option>
                        <option defaultValue value="BA">
                          BA
                        </option>
                        <option defaultValue value="PM">
                          PM
                        </option>
                        <option defaultValue value="PO">
                          PO
                        </option>
                      </select> */}
                    </td>
                  </tr>
                  <tr>
                    <th>Start date </th>
                    <td>
                      <input
                        disabled
                        // type="date"
                        {...register("sd")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                      {/* {errors?.sd?.type === "pattern" && (
                        <p style={{ color: "red" }}>
                          Wrong format date(dd/mm/YYYY)
                        </p>
                      )} */}
                    </td>
                  </tr>
                  <tr>
                    <th>% Effort </th>
                    <td>
                      <input
                        disabled
                        // type="number"
                        min={0}
                        {...register("pe")}
                        // required
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>Level</th>
                    <td>
                      <input disabled {...register("level")} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={12}>
              <table>
                <tbody>
                  <tr>
                    <th>Project</th>
                    <td>
                      <input disabled {...register("pName")} />
                      {/* <select {...register("pName")} disabled required>
                        <Select.Option required></Select.Option>
                        <option defaultValue value={pName}>
                          {pName}
                        </option>
                      </select> */}
                    </td>
                  </tr>
                  <tr>
                    <th>Quantity</th>
                    <td>
                      <input
                        disabled
                        // type="number"
                        // max={quantity}
                        // min={1}
                        {...register("quantity")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>End date </th>
                    <td>
                      <input
                        disabled
                        // type="date"
                        {...register("ed")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                      {/* {errors?.ed?.type === "pattern" && (
                        <p style={{ color: "red" }}>
                          Wrong format date(dd/mm/YYYY)
                        </p>
                      )} */}
                    </td>
                  </tr>
                  <tr>
                    <th>% Bill</th>
                    <td>
                      <input disabled min={0} {...register("pBill")} />
                    </td>
                  </tr>

                  <tr>
                    <th>Skill</th>
                    <td>
                      <input disabled {...register("skill")} />

                      {/* <select {...register("skill")} required disabled>
                        <Select.Option required></Select.Option>
                        <option defaultValue value="BA">
                          BA
                        </option>
                        <option defaultValue value="PM">
                          PM
                        </option>
                      </select> */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    marginLeft: "100px",
                    marginTop: "30px",
                    backgroundColor: "#2a5bbb",
                    color: "white",
                  }}
                  type="submit"
                >
                  Request
                </button>

                <button
                  style={{
                    backgroundColor: "white",
                    color: "#909090",
                    border: "1px solid",
                    marginLeft: "50px",
                    marginTop: "30px",
                  }}
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Modal>
    </div>
  );
}
