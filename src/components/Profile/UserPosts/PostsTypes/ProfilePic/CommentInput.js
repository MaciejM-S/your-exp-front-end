import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Badge,
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import profilePicStyle from "./profilePicStyle";
const {
  commentBoxStyle,
  leftIconStyle,
  commentInputStyle,
} = profilePicStyle;


function CommentInput(props) {
  return (   <Box sx={{ ...commentBoxStyle, display: props.textField }}>
    <ChevronLeftIcon
      sx={leftIconStyle}
      onClick={() => {
        props.setTextField("none");
      }}
    />
    <TextField
      id="filled-basic"
      autoFocus={true}
      multiline={true}
      sx={commentInputStyle}
      variant="standard"
      value={props.comment}
      onChange={(e) => {
        props.setComment(e.target.value);
      }}
      placeholder={props.commentError ? props.commentError : "input comment"}
    />
    {props.uploadingComment ? (
      <CircularProgress sx={{ width: "15px", ml: 2 }} />
    ) : (
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        sx={{ ml: 1 }}
        onClick={() => {
          props.setUploadingComment(true);
          props.handleAddComment();
        }}
      >
        <AddIcon />
      </Fab>
    )}
  </Box> );
}

export default CommentInput;