import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, MainPage, SignUpPage, ActivatePage } from "./pages/index";
import { Header } from "./components/index";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/activate" element={<ActivatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
