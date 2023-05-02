import React from "react";
import {
  Typography,
  ButtonGroup,
  Box,
  Button
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import userFeedStyle from "./userFeedStyle";
import PostAddIcon from "@mui/icons-material/PostAdd";

const {
  userInfoStyle,
  firstNameStyle,
  lastNameStyle,
  buttonsContainerStyle,
  infoButtonStyle,
} = userFeedStyle;

function UserFeedInfo(props) {
  return (
    <Box sx={userInfoStyle}>
      <Typography variant="h3" gutterBottom component="div" sx={firstNameStyle}>
        {props.user && props.user.firstName}
      </Typography>
      <Typography variant="h3" gutterBottom component="div" sx={lastNameStyle}>
        {props.user && props.user.lastName}
      </Typography>
      <Box sx={buttonsContainerStyle}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <ButtonGroup variant="outlined">
            <Button
              sx={infoButtonStyle}
              onClick={() => {
                props.setOpenAdd(true);
              }}
            >
              Add post
              <PostAddIcon
                sx={{
                  marginLeft: "7px",
                }}
              />
            </Button>
            <Button
              variant="contained"
              sx={{ ...infoButtonStyle, color: "black" }}
              onClick={() => {
                props.setOpenAddPictures(true);
              }}
            >
              Add pictures
              <AddAPhotoIcon
                sx={{
                  marginLeft: "7px",
                  transform: "translateY(-7%)",
                }}
              />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}

export default UserFeedInfo;
