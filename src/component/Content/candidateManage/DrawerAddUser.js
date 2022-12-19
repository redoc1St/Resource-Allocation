import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUsers } from "../../../Store/Actions/UserActions";
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";
const { RangePicker } = DatePicker;

export default function DrawerAddUser() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const submitForm = async (e) => {
    // console.log(e.Start_Day._d.toLocaleDateString("en-US"));

    try {
      const res = await axios({
        url: process.env.REACT_APP_BASE_URL + "/api/user/createUser",
        method: "POST",
        data: {
          ...e,
          isactive: 1,
          password: "",
          birthday: e.birthday._d.toLocaleDateString("en-US"),
          Start_Day: e.Start_Day._d.toLocaleDateString("en-US"),
        },
      });
      if (res.data == "Added Successfully") {
        message.success({
          content: "Add user successfully",
          style: { marginTop: "50px" },
        });
        dispatch(getUsers());
      } else if (res.data == "FAILS") {
        message.error({
          content: "Email already exist, please input another email !",
          style: { marginTop: "50px" },
        });
      }

      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <span
        style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}
        onClick={showDrawer}
      >
        + Add a new user
      </span>

      <Drawer
        style={{ marginTop: "50px" }}
        title="Create a new account"
        width={720}
        onClose={onClose}
        closable={false}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          onFinish={(values) => submitForm(values)}
          onFinishFailed={(err) => {
            console.log(err);
          }}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Please enter username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true, message: "Please enter fullname" }]}
              >
                <Input placeholder="Please enter fullname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Please enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input placeholder="Please enter address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="usertype"
                label="Type of user"
                rules={[
                  { required: true, message: "Please choose the type of user" },
                ]}
              >
                <Select
                  // initialvalues={"employee"}
                  placeholder="Please choose the type of user"
                >
                  <Option value="employee">Employee</Option>

                  <Option value="leader">Leader</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Department_id"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please choose the department of user",
                  },
                ]}
              >
                <Select placeholder="Please choose the department of user">
                  <Option value="1">BU 1</Option>
                  <Option value="2">BU 2</Option>
                  <Option value="3">BU 3</Option>
                  <Option value="4">BU 4</Option>
                  <Option value="5">BU 5</Option>

                  {/* <Option value="leader">Leader</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="birthday"
                label="Birth Date"
                rules={[{ required: true, message: "Please enter birthdate" }]}
              >
                <DatePicker
                  format={"YYYY/MM/DD"}
                  placeholder="Please enter birthdate"
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="Start_Day"
                label="Start date"
                rules={[{ required: true, message: "Please enter start date" }]}
              >
                <DatePicker
                  format={dateFormat}
                  placeholder="Please enter start date"
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Button >Submit</Button> */}
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
}
