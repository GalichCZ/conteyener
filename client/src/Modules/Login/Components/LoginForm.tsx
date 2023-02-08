import React, { useState, useContext } from "react";
import { LoginClass } from "../Functions/Login";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import LoginFormUI from "../UI/LoginFormUI";

interface ILoginValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const Login = new LoginClass();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [err, setErr] = useState<string | null>("");
  const [loginValues, setLoginValues] = useState<ILoginValues>({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    const data = await Login.login(loginValues);

    if ("message" in data) {
      return setErr(data.message);
    }

    if (data._id) {
      window.localStorage.setItem("_id", data._id);
    }

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
      <LoginFormUI
        loginValues={loginValues}
        err={err}
        loginHandler={loginHandler}
        setLoginValues={setLoginValues}
      />
      {/* <Form
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
      </Form> */}
    </>
  );
};
