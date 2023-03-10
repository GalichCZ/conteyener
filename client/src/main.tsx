import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/loginPage.css";
import "./assets/css/signupPage.css";
import "./assets/css/mainPage.css";
import "./assets/css/tablePage.css";
import "./assets/css/usersPage.css";
import "./assets/css/deliveryPage.css";
import "./assets/css/activationPage.css";
import "./assets/css/stockPage.css";
import "./assets/css/header.css";
import { AuthContextProvider } from "./store/auth-context";
import { Loader } from "./UI/index";
import { ReDrawContextProvider } from "./store/redraw-context";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AuthContextProvider>
      <ReDrawContextProvider>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </ReDrawContextProvider>
    </AuthContextProvider>
  </Provider>
);
