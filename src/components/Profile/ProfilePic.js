import { Context } from "../../App";
import React, { useContext } from "react";
import { CardMedia, CardHeader, Typography } from "@mui/material";
import add from "../../assets/add.png";
import { theme } from "../../theme";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import userFeedStyle from "./userFeedStyle";

const { photoCameraIconStyle } = userFeedStyle;

function ProfilePic(props) {
  const context = useContext(Context);

  return (
    <>
      {context.profilePic ? (
        <CardMedia
          id="profile"
          component="img"
          image={"data:image/jpeg;base64," + context.profilePic}
          alt="Paella dish"
          sx={{
            top: "0",
            margin: 0,
            width: "100%",
          }}
        />
      ) : (
        <img
          src={add}
          alt=""
          onClick={() => {
            props.openAddProf();
          }}
          style={{ width: "250px", cursor: "pointer" }}
        />
      )}

      <CardHeader
        subheader={
          <div>
            <Typography
              variant="h6"
              sx={{
                [theme.breakpoints.down("500")]: {
                  fontSize: "15px",
                },
              }}
            >
              Profile Picture
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              {" "}
              {context.profilePicDate}
            </Typography>
          </div>
        }
      />
      <PhotoCameraIcon
        sx={{
          ...photoCameraIconStyle,
          display: context.profilePic ? "block" : "none",
        }}
        onClick={props.openAddProf}
      />
    </>
  );
}

export default ProfilePic;
