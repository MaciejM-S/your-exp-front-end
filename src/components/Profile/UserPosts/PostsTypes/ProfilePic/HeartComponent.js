import * as React from "react";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { theme } from "../../../../../theme";

const HeartComponent = (props) => {
  return props.heart ? (
    <>
      <FavoriteIcon sx={{ color: theme.palette.main_orange }} />
      <Typography sx={{ ml: "2px" }}>{props.comments.hearts.length}</Typography>
    </>
  ) : (
    <>
      <FavoriteBorderIcon />
      <Typography sx={{ ml: "2px" }}>{props.comments.hearts.length}</Typography>
    </>
  );
};

export default HeartComponent;
