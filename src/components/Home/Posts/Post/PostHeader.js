import { Typography } from "@mui/material";
import { theme } from "../../../../theme";

function PostHeader(props) {
  const style = {
    [theme.breakpoints.down(600)]: {
      fontSize: "10px",
    },
  };

  if (props.ownerId === props.user) {
    if (props.type === "profilePic")
      return (
        <Typography sx={style}>you have updated profile picture</Typography>
      );
    if (props.type === "pictures")
      return <Typography sx={style}>you have uploaded picture /-s</Typography>;
    else return <Typography sx={style}>you have published a post</Typography>;
  } else {
    if (props.type === "profilePic")
      return <Typography sx={style}> has updated profile picture</Typography>;
    if (props.type === "pictures")
      return <Typography sx={style}>has uploaded picture /-s</Typography>;
    else return <Typography sx={style}>has published a post</Typography>;
  }
}

export default PostHeader;
