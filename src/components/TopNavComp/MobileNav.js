import logo from "../expanse.svg";
import { theme } from "../../theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Buffer } from "buffer";
import QuickMenu from "./QuickMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import GroupIcon from "@mui/icons-material/Group";
import { AppBar, Avatar, Box, styled, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../App.js";
import AddPost from "../Universal/AddPost/AddPost";
import MainSearch from "./MainSearch";
import topNavStyle from "./topNavStyle";

const { mobileAddCircleStyle, tabStyle, appBarStyle, userCardBoxMobile } =
  topNavStyle;
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const MobileNav = (props) => {
  const context = useContext(Context);
  const info = context.avatar && context.avatar.info;
  const avatar = context && context.avatar && context.avatar.avatar;

  function UserCardBox() {
    return (
      <Box sx={userCardBoxMobile} onClick={props.handleMenu}>
        <Avatar
          src={
            avatar &&
            avatar.data &&
            "data:image/jpeg;base64," +
              Buffer.from(avatar.data, "binary").toString("base64")
          }
          alt={avatar && avatar.info && avatar.info.lastName}
        >
          {info && `${info.lastName[0]}`}
        </Avatar>
      </Box>
    );
  }

  function NavTabs() {
    return (<Tabs
      value={context.authenticated?context.mainMenuValue:-1}
      onChange={props.handleChange}
      aria-label="icon tabs example"
      sx={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Tab
        sx={tabStyle}
        icon={<HomeIcon />}
        aria-label="home"
        iconPosition="end"
      />
      <Tab icon={<GroupIcon />} aria-label="favorite" sx={tabStyle} />
      <Tab icon={<PersonPinIcon />} aria-label="person" sx={tabStyle} />
    </Tabs>);
  }

  return (
    <Box
      sx={{
        display: "none",
        height: "80px",
        [theme.breakpoints.down("md")]: { display: "block" },
      }}
    >
      <AppBar sx={appBarStyle}>
        <Box>
          <img src={logo} className="App-logo" alt="logo" />
        </Box>
        <StyledToolbar>
          <Box
            display={"flex"}
            sx={{
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {context.authenticated&&
            <MainSearch />}
            {context.authenticated&&
            <NavTabs />}
            {context.authenticated&& <AddCircleIcon
              sx={mobileAddCircleStyle}
              onClick={() => {
                if(!context.authenticated){return}
                props.setOpenAddMobile(true);
              }}
            />}
           
          </Box>
        </StyledToolbar>
        <QuickMenu
          setLoadingLogout={props.setLoadingLogout}
          loadingLogout={props.loadingLogout}
        />
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {context.avatar && <UserCardBox />}
          <QuickMenu
            loadingLogout={props.loadingLogout}
            setLoadingLogout={props.setLoadingLogout}
          />
        </Box>
      </AppBar>
      <AddPost
        open={props.openAddMobile}
        handleClose={props.handleCloseAddMobile}
        setDate={props.setDate}
      />
    </Box>
  );
};

export default MobileNav;
