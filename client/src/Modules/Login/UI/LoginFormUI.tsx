import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

interface ILoginValues {
  email: string;
  password: string;
}

interface ILoginFormUI {
  loginValues: ILoginValues;
  err: string | null;
  loginHandler: () => void;
  setLoginValues: (c: ILoginValues) => void;
}

const LoginFormUI: React.FC<ILoginFormUI> = ({
  loginHandler,
  err,
  loginValues,
  setLoginValues,
}) => {
  return (
    <>
      <Form
        className="login-form"
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

        {err && <p className="login-err">{err}</p>}
      </Form>
    </>
  );
};

export default LoginFormUI;
