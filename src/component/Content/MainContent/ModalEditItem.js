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
import useAuth from "../../hooks/useAuth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import request from "../../../../src/api/request";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, getProjectsByName } from "../../../Store/Actions/ProjectActions";

export default function ModalEditItem(data) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Projects.projects);
  const { dataProject, setDataProject,valueInput } = useAuth();
  useEffect(() => {}, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  {
    console.log();
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      pId: data?.data?.pId,
      sdp: data?.data?.sdp,
      pName: data?.data?.name,
      unit: data?.data?.Department_id,
      actualE: data?.data?.actual,
      planE: data?.data?.plan,
      billE: data?.data?.billable,
      edp: data?.data?.edp,
      sda: data?.data?.sda,
      eda: data?.data?.eda,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const onSubmit = async (values) => {
    console.log(values);
    const { pId, pName, unit, planE, actualE, billE, sdp, sda, edp, eda } =
      values;
    try {
      const res = await request({
        url: `https://localhost:5001/api/project/${data.data.key}`,
        method: "PUT",
        data: {
          code: JSON.parse(JSON.stringify(pId)),
          projectName: JSON.parse(JSON.stringify(pName)),
          department_id: JSON.parse(JSON.stringify(unit)),
          effort_planned: JSON.parse(JSON.stringify(planE)),
          effort_actual: JSON.parse(JSON.stringify(actualE)),
          effort_billable: JSON.parse(JSON.stringify(billE)),
          start_plan: JSON.parse(JSON.stringify(sdp)),
          start_actual: JSON.parse(JSON.stringify(sda)),
          end_plan: JSON.parse(JSON.stringify(edp)),
          end_actual: JSON.parse(JSON.stringify(eda)),
        },
      });
      setIsModalOpen(false);
      // dispatch(getProjects());
      // dispatch(getProjectsByName(valueInput ? valueInput : ""));
      message.success({
        content:"Edit project successfully",
        style:{marginTop:'50px'},
      });
      if (valueInput) {
        dispatch(getProjectsByName(valueInput));
      } else {
        dispatch(getProjects());
      }
      
    } catch (err) {
      console.log(err);
    }
    // if (res.data.success) {

    // }
    // else{
    //   message.warning("wrong");

    // }
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
      <Button style={{ border: "0" }} onClick={showModal}>
        <BorderColorIcon />
      </Button>

      <Modal
        // style={{color:'#424a80'}}
        width={700}
        title="Edit the project"
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
                    <td>Project ID</td>
                    <td>
                      <input {...register("pId")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Unit *</td>
                    <td>
                      <select
                        // placeholder="Choose Unit"
                        // value={record.data.unit}
                        {...register("unit")}
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
                  <tr>
                    <td>Actual effort *</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        {...register("actualE")}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Start date (plan) </td>
                    <td>
                      <input
                        // value={data?.data?.sdp}
                        type="date"
                        {...register("sdp")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                      {/* {errors?.sdp?.type === "pattern" && (
                        <p style={{ color: "red" }}>
                          Wrong format date(dd/mm/YYYY)
                        </p>
                      )} */}
                    </td>
                  </tr>
                  <tr>
                    <td>Start date (actual)</td>
                    <td>
                      <input
                        name="sda"
                        type="date"
                        {...register("sda")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
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
                      <input name="pName" {...register("pName")} required />
                    </td>
                  </tr>
                  <tr>
                    <td>Planned effort *</td>
                    <td>
                      <input
                        type="number"
                        {...register("planE")}
                        name="planE"
                        min={0}
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Billable effort *</td>
                    <td>
                      <input
                        type="number"
                        {...register("billE")}
                        min={0}
                        placeholder="0"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>End date (plan) </td>
                    <td>
                      <input
                        type="date"
                        {...register("edp")}
                        // placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>End date (actual)</td>
                    <td>
                      <input
                        type="date"
                        {...register("eda")}
                        name="eda"
                        placeholder="dd/MM/YYYY"
                        format={"DD/MM/YYYY"}
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
                        type="button"
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
