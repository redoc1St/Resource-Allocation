import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import "./index.css";

export default function AddToProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // console.log(record.record.record.role)
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
      //   pId: data?.data?.pId,
      //   sdp: data?.data?.sdp,
      //   unit: data?.data?.unit,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  const onSubmit = async (values) => {
    // const{pId,unit, pName}= values;
    console.log(values);
    // console.log(dataProject);
    // setDataProject([...dataProject, values])
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
      <span onClick={showModal}>Add to project</span>,
      <div>
        <Modal
          width={350}
          // width={200}
          dialogClassName="your-dialog-classname"
          //  style={{width:'400px'}}
          title="Add to Project"
          open={isModalOpen}
          // onOk={handleCreate}
          footer={null}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <table>
              <tbody>
                <tr>
                  <th>Project</th>
                  <td>
                    <select {...register("pName")} required>
                      <Select.Option required></Select.Option>
                      <option defaultValue value="prj1">
                        Project Name 1
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Start date </th>
                  <td>
                    <input type="date" {...register("sDate")} />
                  </td>
                </tr>
                <tr>
                  <th>End date </th>
                  <td>
                    <input type="date" {...register("eDate")} />
                  </td>
                </tr>
                {/* <tr>
                  <th>Role</th>
                  <td>
                    <select
                      placeholder=""
                      // value={record.data.unit}
                      {...register("role")}
                      required
                    >
                      <Select.Option required></Select.Option>
                      <option defaultValue value="BA">
                        BA
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Level</th>
                  <td>
                    <select
                      // placeholder="Choose Unit"
                      // value={record.data.unit}
                      {...register("level")}
                      required
                    >
                      <Select.Option required></Select.Option>
                      <option defaultValue value="junior">
                        Junior
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Skill</th>
                  <td>
                    <select {...register("skill")} required>
                      <Select.Option required></Select.Option>
                      <option value="BA">BA</option>
                    </select>
                  </td>
                </tr> */}
                
                <tr>
                  <th>% Effort</th>
                  <td>
                    <input
                    style={{width:'70px'}}
                    // width={20}
                      type="number"
                      min={0}
                      max={100}
                      {...register("pEffort")}
                      required
                    />
                  </td>
                  </tr>
                  <tr>
                  <th>% Bill</th>
                  <td>
                    <input
                    style={{width:'70px'}}

                      type="number"
                      min={0}
                      max={100}
                      {...register("pBill")}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex" }}>
              <button
                style={{ marginLeft: "100px", 
                marginTop: "30px",
                backgroundColor:'#2a5bbb',
                color:'white'
                }}
                type="submit"
              >
                Add
              </button>

              <button
                style={{
                  backgroundColor:'white',
                color:'#909090',
                  border: "1px solid",
                  marginLeft: "50px",
                  marginTop: "30px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
