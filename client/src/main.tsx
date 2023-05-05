import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/loginPage.css";
import "./css/signupPage.css";
import "./css/mainPage.css";
import "./css/tablePage.css";
import "./css/usersPage.css";
import "./css/deliveryPage.css";
import "./css/activationPage.css";
import "./css/stockPage.css";
import "./css/header.css";
import "./css/filterList.css";
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
