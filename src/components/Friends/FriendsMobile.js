import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Typography, Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Divider from "@mui/material/Divider";
import { theme } from "../../theme";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BlockIcon from "@mui/icons-material/Block";

const friendsBarStyle = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  textTransform: "none",
  color: "white",
};

function FriendsMobile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Toolbar
        sx={{
          background: "rgba (12,12,12, 0.92)",
        }}
      >
        <Button
          sx={{
            color: "white",
          }}
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon sx={{ fontSize: "30px" }} />
        </Button>
        <Typography variant="h6" component="h2" sx={friendsBarStyle}>
          {" "}
          Friends
        </Typography>
        <Menu
          id="fade-menu"
          sx={{ marginTop: "20px" }}
          MenuListProps={{
            "aria-labelledby": "fade-button",
            sx: { backgroundColor: theme.palette.nav },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.handleClick("suggestions");
            }}
          >
            <PeopleOutlineIcon
              sx={{
                marginRight: "20px",
              }}
            />
            <ListItemText primary="suggestions" />
            <ListItemIcon>
              <ArrowForwardIcon
                sx={{
                  marginLeft: "20px",
                }}
              />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.handleClick("friendsList");
            }}
          >
            <PeopleAltIcon
              sx={{
                marginRight: "20px",
              }}
            />
            <ListItemText primary="your friends" />
            <ListItemIcon>
              <ArrowForwardIcon
                sx={{
                  marginLeft: "20px",
                }}
              />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.handleClick("invitations");
            }}
          >
            <GroupAddIcon
              sx={{
                marginRight: "20px",
              }}
            />
            <ListItemText primary="invitations" />
            <ListItemIcon>
              <ArrowForwardIcon
                sx={{
                  marginLeft: "20px",
                }}
              />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.handleClick("search");
            }}
          >
            <ImportContactsIcon
              sx={{
                marginRight: "20px",
              }}
            />
            <ListItemText primary="search for friends" />
            <ListItemIcon>
              <SearchIcon
                sx={{
                  marginLeft: "20px",
                }}
              />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.handleClick("blocked");
            }}
          >
            <BlockIcon
              sx={{
                marginRight: "20px",
              }}
            />
            <ListItemText primary="blocked persons" />
            <ListItemIcon>
              <ArrowForwardIcon
                sx={{
                  marginLeft: "20px",
                }}
              />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </Toolbar>
    </Box>
  );
}

export default FriendsMobile;
