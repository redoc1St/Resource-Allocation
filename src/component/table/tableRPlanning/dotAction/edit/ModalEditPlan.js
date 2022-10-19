import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { Modal, Table } from "antd";
import { display, height } from "@mui/system";
import { useForm } from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function ModalEditPlan(record) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const showModal = () => {
    console.log(record?.record)
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
      RoleName: record?.record?.RoleName,
      Date_start:record?.record?.Date_start,
      Date_end:record?.record?.Date_end,
      Effort_planned:record?.record?.Effort_planned,
      Quantity:record?.record?.Quantity,
      LevelName:record?.record?.LevelName,
      SkillName:record?.record?.SkillName,
      Bill_rate:record?.record?.Bill_rate,
      // sdp: record?.data?.sdp,
      // unit: record?.data?.unit,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const onSubmit = async (values) => {
    // const{pId,unit, pName}= values;
    console.log(values);
    setIsModalOpen(false);

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
                      <input {...register("RoleName")} />
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
                      <input
                        {...register("LevelName")}
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
                    <td>Quantity</td>
                    <td>
                      <input {...register("Quantity")}  />
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
                      <input
                        {...register("SkillName")}
                        // placeholder="dd/MM/YYYY"
                        // format={"DD/MM/YYYY"}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        style={{ marginLeft: "50px", marginTop: "30px" }}
                        type="submit"
                      >
                        Edit
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
