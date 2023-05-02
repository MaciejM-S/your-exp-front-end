import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Fab, CircularProgress, IconButton } from "@mui/material";
import { theme } from "../../../../../theme";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import personPostStyle from "./personPostStyle";

const { leftIconStyle, inputCommentBoxStyle } = personPostStyle;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CommentInput(props) {
  return (
    <Box sx={{ ...inputCommentBoxStyle, display: props.textField }}>
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
        sx={{
          width: "40%",
          minWidth: "100px",
          [theme.breakpoints.down("700")]: {
            width: "70%",
          },
        }}
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
    </Box>
  );
}

export default CommentInput;
