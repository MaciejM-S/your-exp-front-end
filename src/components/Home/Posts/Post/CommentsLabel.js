import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Badge, IconButton, Typography } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { theme } from "../../../../theme";

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
function CommentsLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontWeight: "700",
          [theme.breakpoints.down(700)]: {
            fontSize: "14px",
          },
        }}
      >
        Comments:
      </Typography>

      <Badge
        onClick={props.handleExpandClick}
        sx={{ pl: 1, cursor: "pointer" }}
        badgeContent={
          props.comments &&
          props.comments.comments &&
          props.comments.comments.length
        }
        color="primary"
      >
        <ChatBubbleIcon />
      </Badge>

      <ExpandMore
        expand={props.expanded}
        onClick={props.handleExpandClick}
        aria-expanded={props.expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon sx={{}} />
      </ExpandMore>
    </Box>
  );
}

export default CommentsLabel;
