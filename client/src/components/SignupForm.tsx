import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../functions/userFuncs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

export const SignupForm = () => {
  const UserFunc = new User();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [signUpValues, setSignUpValues] = useState<object>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [firstPass, setFirstPass] = useState<string>("");
  const [secondPass, setSecondPass] = useState<string>("");

  const passwordHandler = (firstPas: string, secondPas: string) => {
    if (firstPas === secondPas && secondPas !== "" && firstPas !== "") {
      setSignUpValues({ ...signUpValues, password: secondPas });
    }
  };

  const signUpHandler = async () => {
    const data = await UserFunc.signUp(signUpValues);
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      authCtx.login();
      return navigate("/activate");
    }
  };

  useEffect(() => {
    passwordHandler(firstPass, secondPass);
  }, [firstPass, secondPass]);

  return (
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
  );
};
