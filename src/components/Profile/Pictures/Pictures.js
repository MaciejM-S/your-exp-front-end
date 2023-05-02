import * as React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Typography, Grid, Container } from "@mui/material";
import AddPictures from "../../Universal/AddPictures";
import CircularProgressComponent from "../../Universal/CircularProgressComponent.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddProfilePic from "./AddProfilePic";
import { theme } from "../../../theme";
import Picture from "./Picture";
import { baseUrl } from "../../..";
const mainContainerStyle = {
  paddingTop: "50px",
  width: "100vw",
};
const buttonsStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px",
};
const updateButtonStyle = {
  width: "200px",
  [theme.breakpoints.down("500")]: {
    width: "120px",
    fontSize: "12px",
  },
};

const addPicturesButtonStyle = {
  color: "black",
  width: "200px",
  [theme.breakpoints.down("500")]: {
    width: "120px",
    fontSize: "12px",
  },
};

export default function Pictures() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myTime, setMyTime] = React.useState();
  const [avatarDate, setAvatarDate] = React.useState();
  const [pictures, setPictures] = React.useState([]);
  const [currentPicture, setCurrentPicture] = React.useState();
  const [addPictures, setAddPictures] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [addProfPicture, setAddProfPicture] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  let [setParentTime] = useOutletContext();
  const open = Boolean(anchorEl);
  const rendered = React.useRef(false);
  const controller = new AbortController();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    signal: controller.signal,
  };
  React.useEffect(() => {
    handleData();

    return () => {
      if (rendered.current) {
        return controller.abort();
      } else {
        rendered.current = true;
      }
    };
  }, [myTime]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openAddPictures = () => {
    setAddPictures(true);
  };
  const closeAddPictures = () => {
    setAddPictures(false);
  };
  const openAddProfPicture = () => {
    setAddProfPicture(true);
  };
  const closeAddProfPicture = () => {
    setAddProfPicture(false);
  };
  let displayInfo = false;
  if (pictures.length > 0) {
    displayInfo = true;
  }
  const mdSize = () => {
    if (pictures) {
      if (pictures.length < 2) {
        return 4;
      } else if (pictures.length < 3) {
        return 8;
      }
    }
    return 12;
  };
  const smSize = () => {
    if (pictures) {
      if (pictures.length < 2) {
        return 4;
      }
    }
    return 8;
  };

  const handleClose = () => {
    if (deleting) {
      return;
    }
    setAnchorEl(null);
  };

  const handleData = () => {
    axios
      .get(baseUrl
        + "/downloadPictures", config)
      .catch((e) => {})
      .then((response) => {
        setPictures(response.data);
        setLoading(false);
      })
      .catch((e) => {});
  };

  const deletePicture = (id) => {
    if (id === undefined) {
      id = "profile";
    }

    axios
      .delete(baseUrl
        + "/deletePicture",{headers:config.headers, data:{id}  } )
      .then((response) => {
        setDeleting(false);
        setLoading(true);
        handleData();
        handleClose();
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgressComponent />
      ) : (
        <>
          <Container sx={mainContainerStyle}>
            <Box sx={buttonsStyle}>
              <ButtonGroup variant="outlined">
                <Button onClick={openAddProfPicture} sx={updateButtonStyle}>
                  Update Profile Picture
                  <AccountBoxIcon
                    sx={{
                      marginLeft: "7px",
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  onClick={openAddPictures}
                  sx={addPicturesButtonStyle}
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

            {avatarDate || displayInfo ? (
              false
            ) : (
              <Typography variant="profileNoData" component="div">
                You haven't added any pictures yet
              </Typography>
            )}

            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: smSize(), md: mdSize() }}
            >
              {pictures &&
                pictures.map((picture, index) => (
                  <Picture
                    picture={picture}
                    index={index}
                    handleClick={handleClick}
                    open={open}
                    setCurrentPicture={setCurrentPicture}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    setDeleting={setDeleting}
                    deletePicture={deletePicture}
                    currentPicture={currentPicture}
                    deleting={deleting}
                  />
                ))}
            </Grid>
            <AddPictures
              open={addPictures}
              handleClose={closeAddPictures}
              setMyTime={setMyTime}
            />
            <AddProfilePic
              open={addProfPicture}
              handleClose={closeAddProfPicture}
              setMyTime={setMyTime}
              setParentTime={setParentTime}
            />
          </Container>
        </>
      )}
    </>
  );
}
