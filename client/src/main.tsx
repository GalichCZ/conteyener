import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/loginPage.css";
import "./assets/css/signupPage.css";
import "./assets/css/mainPage.css";
import "./assets/css/tablePage.css";
import "./assets/css/usersPage.css";
import "./assets/css/activationPage.css";
import "./assets/css/header.css";
import { AuthContextProvider } from "./store/auth-context";
import { Loader } from "./UI/index";
import { ReDrawContextProvider } from "./store/redraw-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <ReDrawContextProvider>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </ReDrawContextProvider>
  </AuthContextProvider>
);
