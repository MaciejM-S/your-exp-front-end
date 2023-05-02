import * as React from "react";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { theme } from "../../../../../theme";

  const ThumbComponent = (props) => {
    return props.thumb ? (
      <>
        <ThumbUpIcon
          sx={{ color: theme.palette.main_orange}}
        />
        <Typography sx={{ml:'3px'}} >{props.comments.thumbsup.length}</Typography>
      </>
    ) : (<>
      <ThumbUpOffAltIcon
      />
      <Typography sx={{ml:'3px'}} >{props.comments.thumbsup.length}</Typography>
      </>
    );
  };

  export default ThumbComponent