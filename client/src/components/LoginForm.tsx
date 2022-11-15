import { Button, Checkbox, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../functions/userFuncs";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const UserFuncs = new User();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [loginValues, setLoginValues] = useState<object>({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    const data = await UserFuncs.login(loginValues);

    console.log(data);

    if (data.token) {
      window.localStorage.setItem("token", data.token);
      authCtx.login();
    }
    if (!data.is_activated) {
      return navigate("/activate");
    } else return navigate("/");
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(e) => {
              setLoginValues({ ...loginValues, email: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) => {
              setLoginValues({ ...loginValues, password: e.target.value });
            }}
          />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={loginHandler} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <p>
            No account ? <Link to="/signup">Sign Up</Link>
          </p>
        </Form.Item>
      </Form>
    </>
  );
};
