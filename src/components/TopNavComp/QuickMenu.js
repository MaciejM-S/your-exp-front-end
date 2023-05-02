import React, {useState} from "react";
import { CircularProgress, Menu, MenuItem,  } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";
function QuickMenu(props) {

const navigate = useNavigate()


  return ( <Menu
    MenuListProps={{sx:{background:theme.palette.lightGray}
    }}
    id="demo-positioned-menu"
    aria-labelledby="demo-positioned-button"
    open={props.open||false}
    onClose={(e) => props.setOpen(false)}
    anchorOrigin={{
      vertical: 80,
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: 80,
      horizontal: 25,
    }}
  >
    <MenuItem
      sx={{ padding: "15px" }}
      onClick={() => {
        props.setOpen(false);
        navigate("profile/info");

      }}
    >
      <ManageAccountsIcon sx={{ mr: 1 }} />
      Profile Settings
    </MenuItem>
    <MenuItem
      sx={{ padding: "15px" }}
      onClick={() => {
      props.setLoadingLogout(true)
      setTimeout(()=>{ 
       props.handleLogout();
       props.setOpen(false)}, 1500)
       
      }}
    >
      <ExitToAppIcon sx={{ mr: 1 }} />
      Log out

     { props.loadingLogout&&<CircularProgress size={25} sx={{ml:1, color:'#DDD'}}/>}
    </MenuItem>
  </Menu>)
}

export default QuickMenu;