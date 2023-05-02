import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Badge,
  Button,
  Fab,
  Divider,
  CircularProgress,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { theme } from "../../../../../theme";
import AddCommentIcon from "@mui/icons-material/AddComment";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Buffer } from "buffer";
import Comments from "../../../../Profile/UserPosts/PostsTypes/Comments/Comments";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import addComment from "../../../../../functions/addComment";
import axios from "axios";
import ImageList from "../../../../Profile/UserPosts/PostsTypes/ImageList/ImageList";
import { useContext } from "react";
import { Context } from "../../../../../App";
import ThumbComponent from "../../../../Profile/UserPosts/PostsTypes/ProfilePic/ThumbComponent";
import HeartComponent from "../../../../Profile/UserPosts/PostsTypes/ProfilePic/HeartComponent";
import personPostStyle from './personPostStyle'


const {mainBoxStyle,
  commentsBarStyle,
  leftIconStyle} = personPostStyle

function PostTopBar(props) {
  return (  <Box
    sx={mainBoxStyle}
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
          && "data:image/jpeg;base64," +
          Buffer.from(props.post.userAvatar.data, "binary").toString(
            "base64"
          )}
        aria-label="recipe"
      ></Avatar>
      <Typography
        variant="postNames"
        sx={{
          [theme.breakpoints.down(600)]: {
            fontSize: "14px",
          },
          [theme.breakpoints.down(500)]: {
            fontWeight: 200,
          },
        }}
      >
        {`${props.post.userFirstName} ${props.post.userLastName}`}
      </Typography>
    </Box>
    <Box sx={{ padding: "0 5px" }}>
      <Typography
        variant="postTitle"
        sx={{
          width: "80%",
          [theme.breakpoints.down(500)]: { mt: 3 },
        }}
      >
        publication of a post
      </Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="postDate"
        sx={{
          [theme.breakpoints.down(600)]: {
            fontSize: "14px",
          },
          [theme.breakpoints.down(500)]: {
            fontWeight: 200,
          },
        }}
      >
        {props.post.date}
      </Typography>
    </Box>
  </Box>);
}

export default PostTopBar;