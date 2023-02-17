import React, { useContext, lazy } from "react";
import AuthContext from "./store/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./UI/index";
import "./App.css";
import "antd/dist/antd.css";
import { AllModals } from "./components/index";

const TablePage = lazy(() =>
  wait(0).then(() =>
    import("./pages/TablePage").then(({ TablePage }) => ({
      default: TablePage,
    }))
  )
);
const Users = lazy(() =>
  import("./pages/Users").then(({ Users }) => ({ default: Users }))
);
const DeliveryChannelPage = lazy(() =>
  import("./pages/DeliveryChannelPage").then(({ DeliveryChannelPage }) => ({
    default: DeliveryChannelPage,
  }))
);
const HiddenItemsPage = lazy(() =>
  import("./pages/HiddenItemsPage").then(({ HiddenItemsPage }) => ({
    default: HiddenItemsPage,
  }))
);
const ActivatePage = lazy(() =>
  import("./pages/ActivatePage").then(({ ActivatePage }) => ({
    default: ActivatePage,
  }))
);
const ActivationPage = lazy(() =>
  import("./pages/ActivationPage").then(({ ActivationPage }) => ({
    default: ActivationPage,
  }))
);
const SignUpPage = lazy(() =>
  import("./pages/SignUpPage").then(({ SignUpPage }) => ({
    default: SignUpPage,
  }))
);
const MainPage = lazy(() =>
  import("./pages/MainPage").then(({ MainPage }) => ({
    default: MainPage,
  }))
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then(({ LoginPage }) => ({
    default: LoginPage,
  }))
);
const TechStorePage = lazy(() =>
  import("./pages/TechStorePage").then(({ TechStorePage }) => ({
    default: TechStorePage,
  }))
);
function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <AllModals />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/activate" element={<ActivatePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/tech/users" element={<Users />} />
          <Route path="/tech/store" element={<TechStorePage />} />
          <Route
            path="/tech/deliverychannel"
            element={<DeliveryChannelPage />}
          />
          <Route path="/table/hidden" element={<HiddenItemsPage />} />
          <Route path="/activation" element={<ActivationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
