import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { theme } from "../../../../theme";
import { Buffer } from "buffer";
import PostHeader from "./PostHeader";
import postStyle from "./postStyle";

const { mainBoxStyle } = postStyle;

function PostTopBar(props) {
  return (
    <Box sx={mainBoxStyle}>
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
            props.post.userAvatar &&
            "data:image/jpeg;base64," +
              Buffer.from(props.post.userAvatar.data, "binary").toString(
                "base64"
              )
          }
          aria-label="recipe"
        ></Avatar>

        <Typography
          variant="postNames"
          sx={{
            [theme.breakpoints.down(500)]: {
              fontSize: "10px",
            },
          }}
        >
          {`${props.post.userFirstName} ${props.post.userLastName}`}
        </Typography>
      </Box>
      <Box sx={{ padding: "0 5px" }}>
        <PostHeader
          type={props.post.type}
          ownerId={props.post.user_id}
          user={props.userId}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="postDate"
          sx={{
            [theme.breakpoints.down(500)]: {
              fontSize: "10px",
            },
          }}
        >
          {props.post.date}
        </Typography>
      </Box>
    </Box>
  );
}

export default PostTopBar;
