import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import "./index.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdRoleByCodeRLS,
  getLeaderByBU,
  getLeaderByCode,
  getPNameByRLS,
  getPNameForLeaderByRLSB,
} from "../../../../../Store/Actions/ExtraObjectActions";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getResourcePoolEmp } from "../../../../../Store/Actions/ResourcePoolAction";
import { ROLES } from "../../../../../App";
import useAuth from "../../../../hooks/useAuth";

export default function AddToProject(type) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const dispatch = useDispatch();
  const { r, l, s } = useParams();
  // console.log(r,l,s);
  const PNames = useSelector((state) => state.ExtraObject.pName);
  const IdPLanningRole = useSelector((state) => state.ExtraObject.id);
  const leader = useSelector((state) => state.ExtraObject.leader);
  const [codeProject, setCodeProject] = useState("");
  const [pNamePrj, setPNamePrj] = useState("");

  const [buId, setbuId] = useState("");
  const { user } = useAuth();
  
  console.log(type?.record);
  // useEffect(()={

  // },[codeProject])

  useEffect(() => {
    // console.log(type?.record.Role_id);
    // console.log(type?.record.level_id);
    // console.log(type?.record.skill_id);
    if (type?.record.Role_id) {
      // console.log(type?.record.Role_id);
      // console.log(type?.record.level_id);
      // console.log(type?.record.skill_id);
      if ((r, l, s)) {
        if (user?.UserType == ROLES.LEADER) {
          dispatch(
            getPNameForLeaderByRLSB(
              type?.record?.Role_id,
              type?.record?.level_id,
              type?.record?.skill_id,
              user?.Department_id
            )
          );
        } else dispatch(getPNameByRLS(r, l, s));
      } else {
        if (user?.UserType == ROLES.LEADER) {
          dispatch(
            getPNameForLeaderByRLSB(
              type?.record?.Role_id,
              type?.record?.level_id,
              type?.record?.skill_id,
              user?.Department_id
            )
          );
        } else
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
      console.log(type?.hintNamePrj);
      dispatch(getLeaderByBU(type?.record?.Department_id));
    }
  }, [isModalOpen2]);

  useEffect(() => {
    console.log("code project" + codeProject);
    if (codeProject) {
      // dispatch(getLeaderByCode(codeProject));

      dispatch(
        getIdRoleByCodeRLS(
          codeProject,
          type?.record?.Role_id,
          type?.record?.level_id,
          type?.record?.skill_id
        )
      );
    }
  }, [isModalOpen, codeProject, isModalOpen2]);
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
    // console.log(values);
    // setCodeProject(values.pName.split(",")[1]); //setcodeProject
    // console.log('day nay '+codeProject,
    //   type?.record?.Role_id,
    //   type?.record?.level_id,
    //   type?.record?.skill_id);
    dispatch(
      getIdRoleByCodeRLS(
        codeProject,
        type?.record?.Role_id,
        type?.record?.level_id,
        type?.record?.skill_id
      )
    );
    // console.log(IdPLanningRole);
    setbuId(values.pName.split(",")[0]); //setbuId
    // console.log("****");
    // console.log(IdPLanningRole?.id);
    // console.log(type?.record?.id);
    // console.log("****");

    showModal();
  };

  const handleChangeName = (e) => {
    console.log(e.target.value);
    setCodeProject(e.target.value.split(",")[1]); //setcodeProject
    setPNamePrj(e.target.value.split(",")[2])
  };

  const onSubmit = async (values) => {
    // console.log(new Date(values.sDate).toLocaleDateString("en-US"));
    console.log(type?.record);
    // console.log(type?.record?User_id);

    // const{pId,unit, pName}= values;
    // console.log(dataProject);
    // setDataProject([...dataProject, values])
    //check nếu mà cùng bu thì add trực tiếp k cần thêm vào request, còn k cùng bu thì add vào request

    if (type.buProject) {
      if (type?.buProject === type?.record?.Department_id) {
        try {
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL +
              `/api/Request/EmpToRoleDirect/noti/${leader?.User_id}/${type?.record?.User_id}/${type?.record.Username}/${pNamePrj}`,
            method: "POST",
            data: {
              resourceRole_id: type?.resourceRole_id,
              employee_id: type?.record?.id,
              Date_start: new Date(values.sDate).toLocaleDateString("en-US"),
              Date_end: new Date(values.eDate).toLocaleDateString("en-US"),
              // Date_start:values.sDate,
              Date_end: values.eDate,
              Effort: values.pEffort,
              Bill_rate: values.pBill,
            },
          });

          // if(res.data)
          if (res.data == "Added Successfully") {
            message.success({
              content: "Add employee successfully",
              style: { marginTop: "50px" },
            });
          } else if (res.data == "FAILS") {
            message.error({
              content: "Employee has existed in this project",
              style: { marginTop: "50px" },
            });
          }
          dispatch(getResourcePoolEmp());
          // dispatch(getRoleByCode());
          setIsModalOpen(false);
          setIsModalOpen2(false);
          // dispatch(getRoleByCode());
        } catch (err) {
          console.log(err);
        }
      } else {
        //k cos truoc khác bu
        try {
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL +
              `/api/Request/EmpToRole/noti/${leader?.User_id}/${type?.record.Username}/${pNamePrj}`,
            method: "POST",
            data: {
              resourceRole_id: type?.resourceRole_id,
              employee_id: type?.record?.id,
              Date_start: new Date(values.sDate).toLocaleDateString("en-US"),
              Date_end: new Date(values.eDate).toLocaleDateString("en-US"),
              Effort: values.pEffort,
              Bill_rate: values.pBill,
            },
          });
          // if(res.data)
          message.success({
            content: "Request employee indirect successfull",
            style: { marginTop: "50px" },
          });
          dispatch(getResourcePoolEmp());
          // dispatch(getRoleByCode());
          setIsModalOpen(false);
          setIsModalOpen2(false);
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
      if (buId == type?.record?.Department_id) {
        //[0] laf buId, lấy từ value truyền từ pName dưới
        try {
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL +
              `/api/Request/EmpToRoleDirect/noti/${leader?.User_id}/${type?.record?.User_id}/${type?.record.Username}/${pNamePrj}`,
            method: "POST",
            data: {
              resourceRole_id: IdPLanningRole?.id,
              employee_id: type?.record?.id,
              Date_start: new Date(values.sDate).toLocaleDateString("en-US"),
              Date_end: new Date(values.eDate).toLocaleDateString("en-US"),
              Effort: values.pEffort,
              Bill_rate: values.pBill,
            },
          });
          if (res.data == "Added Successfully") {
            message.success({
              content: "Add employee successfully",
              style: { marginTop: "50px" },
            });
          } else if (res.data == "FAILS") {
            message.error({
              content: "Employee has existed in this project",
              style: { marginTop: "50px" },
            });
          }
          dispatch(getResourcePoolEmp());
          // dispatch(getRoleByCode());
          setIsModalOpen(false);
          setIsModalOpen2(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          // console.log(
          //   "loi o day" + IdPLanningRole?.id + "," + type?.record?.id
          // );
          //khác bu khi không theo luồng project
          const res = await axios({
            url:
              process.env.REACT_APP_BASE_URL +
              `/api/Request/EmpToRole/noti/${leader?.User_id}/${type?.record.Username}/${pNamePrj}`,
            method: "POST",
            data: {
              resourceRole_id: IdPLanningRole?.id,
              employee_id: type?.record?.id,
              Date_start: new Date(values.sDate).toLocaleDateString("en-US"),
              Date_end: new Date(values.eDate).toLocaleDateString("en-US"),
              Effort: values.pEffort,
              Bill_rate: values.pBill,
            },
          });
          // if(res.data)
          message.success({
            content: "Request employee indirect successfull",
            style: { marginTop: "50px" },
          });
          dispatch(getResourcePoolEmp());
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
      return <PersonAddAlt1Icon onClick={showModal2} />;
    } else {
      return (
        <>
          <span onClick={showModal2}>Add to project</span>;
          {/* <span onClick={showModal}>Add to project</span>; */}
        </>
      );
    }
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
            {type?.hintNamePrj ? <p>Recently project: {type?.hintNamePrj} </p> : ""}
            <select
              {...register("pName")}
              onClick={(e) => handleChangeName(e)}
              defaultValue="DEFAULT"
              required
            >
              <option value="DEFAULT" disabled key={20}>
                Select project
              </option>
              {PNames.map((item, index) => {
                return (
                  <option
                    required
                    key={index}
                    value={[item.Depeartment_id, item.Code,item.ProjectName]}
                    // onChange={setCodeProject(item.Code)}
                  >
                    {item.ProjectName}
                  </option>
                );
              })}
              {/* {console.log(codeProject)} */}
            </select>
            <button
              style={{
                marginLeft: "100px",
                marginTop: "30px",
                backgroundColor: "#2a5bbb",
                color: "white",
              }}
              type="submit"
              // onClick={showModal}
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
                    <input type="date" required {...register("sDate")} />
                  </td>
                </tr>
                <tr>
                  <th>End date </th>
                  <td>
                    <input type="date" required {...register("eDate")} />
                  </td>
                </tr>
                {/* {console.log(leader.User_id)} */}
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
            {/* {console.log(PNames)} */}
          </form>
        </Modal>
      </div>
    </div>
  );
}
