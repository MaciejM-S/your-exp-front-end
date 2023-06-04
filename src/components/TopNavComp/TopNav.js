
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App.js";
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import { baseUrl } from "../../index.js";


const TopNav = () => {
  const [date, setDate] = React.useState();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const context = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  const [openAddDesktop, setOpenAddDesktop] = React.useState(false);
  const [openAddMobile, setOpenAddMobile] = React.useState(false);
  
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  React.useEffect(() => {
    context.setMainDate(new Date().getTime().toString());
  }, [date]);

  const handleChange = (event, newValue) => {
    context.setMainMenuValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/friends/suggestions");
        break;
      case 2:
        navigate("/profile/info");
        break;
    }
  };

  const handleCloseAddDesktop = () => {
    setOpenAddDesktop(false);
  };
  const handleCloseAddMobile= () => {
    setOpenAddMobile(false);
  };

  const handleMenu = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.get(baseUrl + "/logout", config).then((response) => {
      localStorage.removeItem("token");
      context.setAvatar();
      context.setProfilePic();
      context.setProfilePicDate();
      context.setAuthenticated(false);
      setLoadingLogout(false);
      navigate(`/`);
    });
  };

  // const info = context.avatar && context.avatar.info;
  // const avatar = context && context.avatar && context.avatar.avatar;
  // const tabValue = context && context.mainMenuValue ? context.mainMenuValue : 1;
  console.log = console.warn = console.error = () => {};



  return (
    <div>
      <DesktopNav
        setOpenAddDesktop={setOpenAddDesktop}
        handleCloseAddDesktop={handleCloseAddDesktop}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleLogout={handleLogout}
        loadingLogout={loadingLogout}
        setLoadingLogout={setLoadingLogout}
        handleChange={handleChange}
        handleMenu={handleMenu}
        openAddDesktop={openAddDesktop}
        setDate={setDate}
      />
      <MobileNav
         setOpenAddMobile={setOpenAddMobile}
         openAddMobile={openAddMobile}
         handleCloseAddMobile={handleCloseAddMobile}
         open={open}
         setOpen={setOpen}
         handleClose={handleClose}
         handleLogout={handleLogout}
         loadingLogout={loadingLogout}
         setLoadingLogout={setLoadingLogout}
         handleChange={handleChange}
         handleMenu={handleMenu}
         setDate={setDate}
      />

      <Outlet context={[setValue]} />
    </div>
  );
};

export default TopNav;
