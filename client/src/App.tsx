import { useState, useContext } from "react";
import AuthContext from "./store/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  MainPage,
  SignUpPage,
  ActivatePage,
  TablePage,
} from "./pages/index";
import { Header } from "./components/index";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/activate" element={<ActivatePage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
