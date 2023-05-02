import * as React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { theme } from "../../../../../theme";
import { Buffer } from "buffer";
import profilePicStyle from "./profilePicStyle";
const {
  mainCardStyle,
  mainBoxStyle,
  changedProfileStyle,
  commentsBoxStyle,
  commentBoxStyle,
  leftIconStyle,
  commentInputStyle,
} = profilePicStyle;

function TopBar(props) {
  return ( <Box sx={mainBoxStyle}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.main_orange,
        }}
        alt={props.post.userFirstName + " " + props.post.userLastName}
        src={
          props.post.userAvatar
            ? "data:image/jpeg" +
              ";base64," +
              Buffer.from(props.post.userAvatar.data, "binary").toString(
                "base64"
              )
            : false
        }
        aria-label="recipe"
      ></Avatar>
      <Typography variant="postNames">{`${props.post.userFirstName} ${props.post.userLastName}`}</Typography>
    </Box>

    <Typography variant="postTitle" sx={changedProfileStyle}>
      You have changed profile picture
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="postDate"
        sx={{
          [theme.breakpoints.down("400")]: {
            m: 0,
            p: 0,
            fontWeight: 200,
          },
        }}
      >
        {props.post.date}
      </Typography>

      <IconButton aria-label="settings">
        <MoreVertIcon
          id="basic-button"
          aria-controls={props.open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={props.open ? "true" : undefined}
          onClick={(e) => {
            props.handleClick(e);
          }}
        />
      </IconButton>
    </Box>
    <Menu
      id="basic-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={(e) => {
        props.handleClose();
      }}
      MenuListProps={{
        style: { background: "#080808" },
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={() => {
          props.setDeleteModal(true);
          props.handleClose();
        }}
      >
        Delete post
      </MenuItem>
    </Menu>
  </Box> );
}

export default TopBar;