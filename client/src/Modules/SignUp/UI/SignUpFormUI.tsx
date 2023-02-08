import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

interface ISignUpValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface ISignUpFormIU {
  signUpValues: ISignUpValues;
  setSignUpValues: (c: ISignUpValues) => void;
  signUpHandler: () => void;
  setFirstPass: (c: string) => void;
  setSecondPass: (c: string) => void;
}

const SignUpFormUI: React.FC<ISignUpFormIU> = ({
  signUpValues,
  setSignUpValues,
  signUpHandler,
  setFirstPass,
  setSecondPass,
}) => {
  return (
    <>
      {" "}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            onChange={(e) => {
              setSignUpValues({ ...signUpValues, email: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            onChange={(e) => {
              setSignUpValues({ ...signUpValues, first_name: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Surname"
          name="Surname"
          rules={[{ required: true, message: "Please input your Surname!" }]}
        >
          <Input
            onChange={(e) => {
              setSignUpValues({ ...signUpValues, last_name: e.target.value });
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
              setFirstPass(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Pass."
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password
            onChange={(e) => {
              setSecondPass(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={signUpHandler} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <p>
            Have account ? <Link to="/login">Log In</Link>
          </p>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpFormUI;
