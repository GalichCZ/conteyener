import React, { useState, createContext, useEffect } from "react";
import { User } from "../functions/userFuncs";

const UserFuncs = new User();

export type AuthContextInterface = {
  token: string | null;
  isLoggedIn: boolean;
  isActivated: boolean;
  role: string;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextInterface>({
  token: "",
  isLoggedIn: false,
  isActivated: false,
  role: "",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState<string | null>("");
  const [role, setRole] = useState<string>("");
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const userIsLoggedIn: boolean = !!token;

  const loginHandler = () => {
    const token = window.localStorage.getItem("token");
    setToken(token);
  };

  const getMe = async () => {
    const _id = window.localStorage.getItem("_id");
    if (_id !== null) {
      const response = await UserFuncs.getMe(_id);
      setIsActivated(response?.is_activated);
      setRole(response?.role);
    }
  };

  useEffect(() => {
    loginHandler();
    getMe();
  }, [window.localStorage.getItem("_id")]);

  const logoutHandler = () => {
    setToken("");
    window.localStorage.clear();
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    isActivated,
    role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
