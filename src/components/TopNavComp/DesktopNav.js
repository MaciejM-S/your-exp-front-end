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
import {
  AppBar,
  Avatar,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { Context } from "../../App.js";
import AddPost from "../Universal/AddPost/AddPost";
import MainSearch from "./MainSearch";
import topNavStyle from "./topNavStyle";
const {
  tabStyle,
  appBarStyle,
  addCircleIconStyle,
  userCardBox,
  sTBoxStyle,
} = topNavStyle;

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const DesktopNav = (props) => {
  const context = useContext(Context);
  const info = context.avatar && context.avatar.info;
  const avatar = context && context.avatar && context.avatar.avatar;



  function UserCardBox() {
    return (<Box sx={userCardBox} onClick={props.handleMenu}>
      <Avatar
        src={
          avatar &&
          avatar.data &&
          "data:image/jpeg" +
          ";base64," +
          Buffer.from(avatar.data, "binary").toString("base64")
        }
        alt={avatar && avatar.info && avatar.info.lastName}
      >
        {info && `${info.lastName[0]}`}
      </Avatar>
      <Typography
        sx={{
          fontWeight: 400,
          display: "flex",
          ml: 1,
        }}
      >
        {info && `${info.firstName} ${info.lastName}`}
      </Typography>
    </Box>);
  }


  function NavTabs() {
    return (<Tabs
    disabled={true}
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
        disabled={!context.authenticated}
        icon={<HomeIcon />}
        aria-label="home"
        iconPosition="end"
      />
      <Tab icon={<GroupIcon />} 
      disabled={!context.authenticated}
      aria-label="favorite" sx={tabStyle} />
      <Tab icon={<PersonPinIcon />} 
      disabled={!context.authenticated}
      aria-label="person" sx={tabStyle} />
    </Tabs>);
  }



  return (
    <Box
      sx={{
        height: "80px",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      <AppBar sx={appBarStyle}>
        <Box>
          <img src={logo} className="App-logo" alt="logo" />
        </Box>
        {context.authenticated&&<MainSearch />}
        
        <StyledToolbar>
          <Box display={"flex"} sx={sTBoxStyle}>
            {context.authenticated&&<NavTabs />}
            
            {context.authenticated&& <AddCircleIcon
              sx={addCircleIconStyle}
              onClick={() => {
                console.log(!context.authenticated);
                if(!context.authenticated){return}
                props.setOpenAddDesktop(true);
              }}
            />}
            
           
          </Box>
        </StyledToolbar>
        <Box
          sx={{
            textAlign: "center",
            [theme.breakpoints.up("2000")]: {
              justifyContent: "space-around",
              mr: 10,
            },
          }}
        >
          {context.avatar &&<UserCardBox/>}
          <QuickMenu
            open={props.open}
            setOpen={props.setOpen}
            handleClose={props.handleClose}
            handleLogout={props.handleLogout}
            loadingLogout={props.loadingLogout}
            setLoadingLogout={props.setLoadingLogout}
          />
        </Box>
      </AppBar>
      <AddPost
        open={props.openAddDesktop}
        handleClose={props.handleCloseAddDesktop}
        setDate={props.setDate}
      />
    </Box>
  );
};

export default DesktopNav;
