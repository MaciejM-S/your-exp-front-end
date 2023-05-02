import * as React from "react";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import { CircularProgress } from "@mui/material";
import addPostStyle from "./addPostStyle";

const PublishButton = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.handleUpload}
      sx={{
        color: "white",
        cursor: "pointer",
        fontSize: "15px",
        padding: "10px 12px",
        marginTop: "25px",
        marginBottom: "10px",
        width: "180px",
        height: "50px",
      }}
    >
      Publish
      {props.loadingPost ? (
        <CircularProgress sx={{ color: "white", ml: 1 }} />
      ) : (
        <PublishIcon
          sx={{
            marginLeft: "5px",
            transform: "translateY(0%) scale(1.3) rotate(90deg)",
            height: "17px",
          }}
        />
      )}
    </Button>
  );
};

export default PublishButton;
