import React, { useState, useEffect, createContext } from "react";

export type AuthContextInterface = {
  token: string | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextInterface>({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState<string | null>("");

  const userIsLoggedIn: boolean = !!token;

  const loginHandler = () => {
    const token = window.localStorage.getItem("token");
    setToken(token);
  };

  const logoutHandler = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
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
