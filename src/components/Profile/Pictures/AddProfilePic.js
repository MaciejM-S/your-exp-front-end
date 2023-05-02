import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UploadIcon from "@mui/icons-material/Upload";
import { CircularProgress } from "@mui/material";
import Axios from "axios";
import addProfilePicStyle from "./addProfilePicStyle";
import { baseUrl } from "../../..";

const {
  backBoxStyle,
  boxStyle,
  titleStyle,
  acceptButtonStyle,
  mainBoxStyle,
  uploadIconStyle,
} = addProfilePicStyle;

const Input = styled("input")({
  display: "none",
});

function AddProfilePic(props) {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const config = {
    headers: {
      "Conten-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      setFileName("The maximum image size is 2Mb ");
      return;
    }
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    setLoading(true);
    if (!file) {
      return setFileName("please choose a picture");
    }
    const fd = new FormData();
    fd.append("image", file, file.name);
    Axios.post(baseUrl
      + "/uploadProfile", fd, config).then(
      (res) => {
        setLoading(false);
        props.handleClose();
        props.setMyTime(new Date().getTime().toString());
        if (props.setParentTime) {
          props.setParentTime(new Date().getTime().toString());
        }
      }
    );
  };

  const handleBack = () => {
    if (loading) return;
    setFile();
    setFileName();
    props.handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleBack}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={boxStyle}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              ...titleStyle,
              [theme.breakpoints.down("600")]: {
                fontSize: "20px",
              },
            }}
          >
            Change profile picture
            <span
              style={{
                fontSize: "40px",
                color: theme.palette.button_orange,
              }}
            >
              .
            </span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleChange}
              />
              <Button variant="outlined" component="span" disabled={loading}>
                Choose Picture
                <DriveFileMoveIcon
                  style={{
                    marginLeft: "20px",
                    transform: "translateY(-4%)",
                  }}
                />
              </Button>
            </label>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                transition: "0.5s",
                padding: "25px 55px",
              }}
            >
              {fileName}
            </Typography>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading}
              sx={{
                ...acceptButtonStyle,
                display: fileName === "" ? "none" : "inline",
              }}
            >
              Accept
              {loading ? (
                <CircularProgress size={14} sx={{ ml: 1 }} />
              ) : (
                <UploadIcon sx={uploadIconStyle} />
              )}
            </Button>
          </Box>
          <Box sx={backBoxStyle} onClick={handleBack}>
            <ArrowBackIosNewIcon />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default AddProfilePic;
