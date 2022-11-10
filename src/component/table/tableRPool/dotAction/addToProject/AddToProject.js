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
import "./index.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdRoleByCodeRLS,
  getPNameByRLS,
} from "../../../../../Store/Actions/ExtraObjectActions";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddToProject(type) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const dispatch = useDispatch();
  const { r, l, s } = useParams();
  // console.log(r,l,s);
  const PNames = useSelector((state) => state.ExtraObject.pName);
  const IdPLanningRole = useSelector((state) => state.ExtraObject.id);
  const [codeProject, setCodeProject] = useState("");
  const [buId, setbuId] = useState("");

  // useEffect(()={

  // },[codeProject])
  
  useEffect(() => {
    // console.log(PNames);
    // console.log(type?.record.Role_id);
    // console.log(type?.record.level_id);
    // console.log(type?.record.skill_id);
    if ((r, l, s)) {
      dispatch(getPNameByRLS(r, l, s));
    } else {
      type?.record?.skill_id
        ? dispatch(
            getPNameByRLS(
              type?.record?.Role_id,
              type?.record?.level_id,
              type?.record?.skill_id
            )
          )
        : console.log("hello");

      // console.log(PNames)
    }
  }, [
    isModalOpen2
    // type?.record?.Role_id,
    // type?.record?.level_id,
    // type?.record?.skill_id,
  ]);
  useEffect(() => {
    dispatch(
      getPNameByRLS(
        type?.record?.Role_id,
        type?.record?.level_id,
        type?.record?.skill_id
      )
    )
    if (codeProject) {
      dispatch(
        getIdRoleByCodeRLS(
          codeProject, 
          type?.record?.Role_id,
          type?.record?.level_id,
          type?.record?.skill_id
        )
      );
    }
  }, [isModalOpen,codeProject]);
  // console.log(PNames[0]?.ProjectName);
  // console.log("id"+type);

  const showModal = () => {
    // console.log(record.record.record.role)

    setIsModalOpen(true);
  };

  const showModal2 = () => {
    // console.log(record.record.record.role)

    setIsModalOpen2(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    // handleSubmit2
  } = useForm({
    defaultValues: {
      // pName:
      //   pId: data?.data?.pId,
      //   sdp: data?.data?.sdp,
      //   unit: data?.data?.unit,
    },
    // mode: "onSubmit", //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
  });

  // const {handleSubmit2}=useForm({defaultValues:{}})
  const onSubmit2 = async (values) => {
    console.log(values);
    setCodeProject(values.pName.split(",")[1]); //setcodeProject
    setbuId(values.pName.split(",")[0]); //setbuId
  };

  const onSubmit = async (values) => {
    // const{pId,unit, pName}= values;
    // console.log(dataProject);
    // setDataProject([...dataProject, values])
    //check nếu mà cùng bu thì add trực tiếp k cần thêm vào request, còn k cùng bu thì add vào request

    if (type.buProject) {
      if (type?.buProject === type?.record?.Department_id) {
        try {
          console.log("hello");
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL + "/api/Request/EmpToRoleDirect",
            method: "POST",
            data: {
              resourceRole_id: type?.resourceRole_id,
              employee_id: type?.record?.id,
            },
          });
          // if(res.data)
          message.success({
            content: "Request employee successfull",
            style: { marginTop: "50px" },
          });
          // dispatch(getRoleByCode());

          setIsModalOpen(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        //k cos truoc khác bu
        try {
          console.log("hello2");
          const res = await axios({
            url: process.env.REACT_APP_BASE_URL + "/api/Request/EmpToRole",
            method: "POST",
            data: {
              resourceRole_id: type?.resourceRole_id,
              employee_id: type?.record?.id,
            },
          });
          // if(res.data)
          message.success({
            content: "Request employee successfull",
            style: { marginTop: "50px" },
          });
          // dispatch(getRoleByCode());

          setIsModalOpen(false);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log(
        values.pName.split(",")[1],
        type?.record?.Role_id,
        type?.record?.level_id,
        type?.record?.skill_id
      );

      //cùng bu khi không theo luồng project
      // console.log(IdPLanningRole);
            if (buId == type?.record?.Department_id) {   //[0] laf buId, lấy từ value truyền từ pName dưới
              try {
                console.log("hello");
                const res = await axios({
                  url:
                    process.env.REACT_APP_BASE_URL + "/api/Request/EmpToRoleDirect",
                  method: "POST",
                  data: {
                    resourceRole_id: IdPLanningRole?.id,
                    employee_id: type?.record?.id,
                  },
                });
                // if(res.data)
                message.success({
                  content: "Request employee direct successfull",
                  style: { marginTop: "50px" },
                });
                // dispatch(getRoleByCode());

                setIsModalOpen(false);
                setIsModalOpen2(false);

              } catch (err) {
                console.log(err);
              }
            }else{
              try {
      //khác bu khi không theo luồng project
                const res = await axios({
                  url: process.env.REACT_APP_BASE_URL + "/api/Request/EmpToRole",
                  method: "POST",
                  data: {
                    resourceRole_id: IdPLanningRole?.id,
                    employee_id: type?.record?.id,
                  },
                });
                // if(res.data)
                message.success({
                  content: "Request employee indirect successfull",
                  style: { marginTop: "50px" },
                });
                // dispatch(getRoleByCode());

                setIsModalOpen(false);
                setIsModalOpen2(false);

              } catch (err) {
                console.log(err);
              }
            }
    }

    // if (type?.buProject === type?.record?.Department_id) {
    //   console.log("bang nhau");
    // } else {
    //   console.log("ko bang nhau");
    // }
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

  const showIconOrSpan = () => {
    if (type.type === "icon") {
      return <PersonAddAlt1Icon onClick={showModal} />;
    } else {
      return (
        <>
          <span onClick={showModal2}>Add to project</span>;
          {/* <span onClick={showModal}>Add to project</span>; */}
        </>
      );
    }
  };

  const listPName = () => {
    return PNames.map((item) => {
      <option>123456</option>;
    });
  };

  return (
    <div>
      {showIconOrSpan()}
      <div>
        <Modal
          dialogClassName="your-dialog-classname"
          title="Choose project to add"
          open={isModalOpen2}
          width={300}
          footer={null}
          onCancel={handleCancel}
          style={{ textAlign: "center" }}
        >
          <form onSubmit={handleSubmit(onSubmit2)}>
            <h5>Project name</h5>
            <select {...register("pName")} required>
              {/* <Select.Option required></Select.Option> */}
              {/* {listPName} */}
              {/* <option>{PNames[0]?.ProjectName}</option> */}

              {PNames.map((item, index) => {
                return (
                  <option key={index} value={[item.Depeartment_id, item.Code]}>
                    {item.Code}
                  </option>
                );
              })}
            </select>
            <button
              style={{
                marginLeft: "100px",
                marginTop: "30px",
                backgroundColor: "#2a5bbb",
                color: "white",
              }}
              type="submit"
              onClick={showModal}
            >
              Next
            </button>
          </form>
        </Modal>
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
                {/* <tr>
                  <th>Project</th>
                  <td>
                    <select {...register("pName")} required>
                      {PNames.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={[item.Depeartment_id, item.Code]}
                          >
                            {item.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr> */}
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
                      style={{ width: "70px" }}
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
                      style={{ width: "70px" }}
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
                style={{
                  marginLeft: "100px",
                  marginTop: "30px",
                  backgroundColor: "#2a5bbb",
                  color: "white",
                }}
                type="submit"
              >
                Add
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
          </form>
        </Modal>
      </div>
    </div>
  );
}
