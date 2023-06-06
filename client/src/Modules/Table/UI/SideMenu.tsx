import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, Spin } from "antd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { setOpenItemCreate } from "../../../store/slices/tableItemCreateSlice";
import { useAppDispatch } from "../../../hooks/hooksRedux";
import { LoadingOutlined } from "@ant-design/icons";
import { UploadFile } from "../Components/UploadFile";
import { UsersHandlerClass } from "../../UsersHandle/Functions/UsersHandler";
import GlobalUpload from "../Components/GlobalUpload";
import { UserData } from "@/Types/Types";

type Anchor = "top" | "left" | "bottom" | "right";

const ALLOWED_MAILS = "k.beregovoi@onlypatriot.com galichmsk1515@gmail.com";

interface ISideMenu {
  downloading: boolean;
  handleDownloadClick: () => void;
}

const UsersHandler = new UsersHandlerClass();

const SideMenu: React.FC<ISideMenu> = ({
  downloading,
  handleDownloadClick,
}) => {
  const [user, setUser] = useState<UserData | undefined>({} as UserData);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const onClose = (anchor: Anchor, open: boolean) => {
    setState({ ...state, [anchor]: open });
  };

  const userHandler = async () => {
    const user = await UsersHandler.getMe(window.localStorage.getItem("_id"));
    setUser(user);
  };

  useEffect(() => {
    userHandler();
  }, []);

  const list = (anchor: Anchor) => {
    const dispatch = useAppDispatch();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <ListItem className="side-menu">
            <Button
              style={{ marginBottom: "1rem" }}
              type="primary"
              onClick={() => {
                dispatch(setOpenItemCreate());
              }}
            >
              Создать новую запись
            </Button>
            <div style={{ marginBottom: "20px" }}>
              <Button disabled={downloading} onClick={handleDownloadClick}>
                Скачать актуальную таблицу
              </Button>
              {downloading && (
                <Spin style={{ marginLeft: "10px" }} indicator={antIcon} />
              )}
            </div>
            <UploadFile anchor={anchor} onClose={onClose} />
            <div style={{ marginTop: "20px" }}>
              {user && ALLOWED_MAILS.includes(user.email) && (
                <GlobalUpload anchor={anchor} onClose={onClose} />
              )}
            </div>
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <div>
      <Button
        style={{ marginBottom: "10px" }}
        onClick={toggleDrawer("left", true)}
      >
        Меню
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default SideMenu;
