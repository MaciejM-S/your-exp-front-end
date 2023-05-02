import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Divider,
  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";
import { theme } from "../../../../../theme";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Buffer } from "buffer";
import Comments from "../Comments/Comments";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import addComment from "../../../../../functions/addComment";
import axios from "axios";
import ImageList from "../ImageList/ImageList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteModal from "../DeleteModal/DeleteModal";
import HeartComponent from "../ProfilePic/HeartComponent";
import ThumbComponent from "../ProfilePic/ThumbComponent";
import CommentInput from "../ProfilePic/CommentInput";
import CommentsLabel from "../ProfilePic/CommentsLabel";
import picturePostStyle from './picturePostStyle'


const {navBarStyle,
  postTitleStyle,
  commentsBarStyle} = picturePostStyle

function TopBar(props) {
  return ( <Box
    sx={navBarStyle}
  >
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
            ? "data:image/jpeg;base64," +
              Buffer.from(props.post.userAvatar.data, "binary").toString(
                "base64"
              )
            : false
        }
        aria-label="recipe"
      ></Avatar>
      <Typography variant="postNames">
        {`${props.post.userFirstName} ${props.post.userLastName}`}
      </Typography>
    </Box>

    <Typography
      variant="postTitle"
      sx={postTitleStyle}
    >
      {props.post.type === "pictures"
        ? "You have added picture/-s"
        : "You have published post"}
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
      <DeleteModal
        open={props.deleteModal}
        setDeleteModal={props.setDeleteModal}
        commentsId={props.post.commentsId}
        setDate={props.setDate}
      />
    </Box>
  </Box> );
}

export default TopBar;