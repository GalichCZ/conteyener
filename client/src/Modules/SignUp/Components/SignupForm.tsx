import React, { useContext, useEffect, useState } from "react";
import { SignupClass } from "../Functions/Signup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import SignUpFormUI from "../UI/SignUpFormUI";

interface ISignUpValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const SignupForm = () => {
  const Signup = new SignupClass();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [signUpValues, setSignUpValues] = useState<ISignUpValues>({
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
    const data = await Signup.signUp(signUpValues);

    if (data._id) {
      window.localStorage.setItem("_id", data._id);
    }

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
    <SignUpFormUI
      signUpValues={signUpValues}
      setSignUpValues={setSignUpValues}
      signUpHandler={signUpHandler}
      setFirstPass={setFirstPass}
      setSecondPass={setSecondPass}
    />
    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   initialValues={{ remember: true }}
    //   autoComplete="off"
    // >
    //   <Form.Item
    //     label="Email"
    //     name="email"
    //     rules={[{ required: true, message: "Please input your email!" }]}
    //   >
    //     <Input
    //       onChange={(e) => {
    //         setSignUpValues({ ...signUpValues, email: e.target.value });
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Name"
    //     name="name"
    //     rules={[{ required: true, message: "Please input your name!" }]}
    //   >
    //     <Input
    //       onChange={(e) => {
    //         setSignUpValues({ ...signUpValues, first_name: e.target.value });
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Surname"
    //     name="Surname"
    //     rules={[{ required: true, message: "Please input your Surname!" }]}
    //   >
    //     <Input
    //       onChange={(e) => {
    //         setSignUpValues({ ...signUpValues, last_name: e.target.value });
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     name="password"
    //     rules={[{ required: true, message: "Please input your password!" }]}
    //   >
    //     <Input.Password
    //       onChange={(e) => {
    //         setFirstPass(e.target.value);
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     label="Confirm Pass."
    //     name="confirmPassword"
    //     rules={[{ required: true, message: "Please confirm your password!" }]}
    //   >
    //     <Input.Password
    //       onChange={(e) => {
    //         setSecondPass(e.target.value);
    //       }}
    //     />
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button onClick={signUpHandler} type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <p>
    //       Have account ? <Link to="/login">Log In</Link>
    //     </p>
    //   </Form.Item>
    // </Form>
  );
};
