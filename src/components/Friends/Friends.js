import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../theme";
import { Outlet, useNavigate } from "react-router-dom";
import FriendsMobile from "./FriendsMobile";
import BlockIcon from "@mui/icons-material/Block";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import friendsStyle from "./friendsStyle";

const navWidth = 250;

const { listItemStyle, mainBoxStyle, mobileMainBoxStyle, outletStyle } =
  friendsStyle;

const listItemStyleFocused = {
  ...listItemStyle,
  borderColor: theme.palette.main_orange,
};

function Friends(props) {
  let [setValue] = useOutletContext();
  const [focused, setFocused] = React.useState(false);
  const context = React.useContext(Context);
  const navigate = useNavigate();

  React.useEffect(() => {
    context.setMainMenuValue(1);
    !context.authenticated && navigate("/");
  }, []);

  const handleClick = (item) => {
    switch (item) {
      case "suggestions":
        setFocused(item);
        navigate("/friends/suggestions");
        break;
      case "friends":
        setFocused(item);
        break;
      case "invitations":
        setFocused(item);
        navigate("/friends/invitations");
        break;
      case "search":
        setValue(2);
        navigate("/profile/userFriends");
        break;
      case "blocked":
        setFocused(item);
        navigate("/friends/blocked");
        break;
      case "friendsList":
        setFocused(item);
        navigate("/friends/friendsList");
        break;
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ ...mainBoxStyle }}>
          <List>
            <ListItemText
              sx={{
                margin: "5px 5px 10px",
              }}
              primaryTypographyProps={{
                sx: {
                  fontSize: "25px",
                },
              }}
              primary="Friends"
            />
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  focused === "suggestions"
                    ? listItemStyleFocused
                    : listItemStyle
                }
                onClick={() => {
                  handleClick("suggestions");
                }}
              >
                <PeopleOutlineIcon
                  sx={{
                    marginRight: "20px",
                  }}
                />
                <ListItemText primary="friends suggestions" />
                <ListItemIcon>
                  <ArrowForwardIcon sx={{ ml: 2 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  focused === "friendsList"
                    ? listItemStyleFocused
                    : listItemStyle
                }
                onClick={() => {
                  handleClick("friendsList");
                }}
              >
                <PeopleAltIcon
                  sx={{
                    marginRight: "20px",
                  }}
                />
                <ListItemText primary="your friends" />
                <ListItemIcon>
                  <ArrowForwardIcon sx={{ ml: 2 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  focused === "invitations"
                    ? listItemStyleFocused
                    : listItemStyle
                }
                onClick={() => {
                  handleClick("invitations");
                }}
              >
                <GroupAddIcon
                  sx={{
                    marginRight: "20px",
                  }}
                />
                <ListItemText primary="invitations" />
                <ListItemIcon>
                  <ArrowForwardIcon sx={{ ml: 2 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={focused === "search" ? listItemStyleFocused : listItemStyle}
                onClick={() => {
                  handleClick("search");
                }}
              >
                <ImportContactsIcon
                  sx={{
                    marginRight: "20px",
                  }}
                />
                <ListItemText primary="search for friends" />
                <ListItemIcon>
                  <SearchIcon sx={{ ml: 2 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={
                  focused === "blocked" ? listItemStyleFocused : listItemStyle
                }
                onClick={() => {
                  handleClick("blocked");
                }}
              >
                <BlockIcon
                  sx={{
                    marginRight: "20px",
                  }}
                />
                <ListItemText primary="blocked persons" />
                <ListItemIcon>
                  <ArrowForwardIcon sx={{ ml: 2 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={mobileMainBoxStyle}>
          <FriendsMobile handleClick={handleClick} />
        </Box>
        <Box
          sx={{
            ...outletStyle,
            [theme.breakpoints.up("md")]: {
              left: `calc(${navWidth}px + 5%)`,
              margin: "25px 0",
              width: `calc(100% - ${navWidth}px - 5%)`,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Friends;
