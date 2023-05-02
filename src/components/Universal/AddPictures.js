import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TableContainer } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/private-theming";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CircularProgress } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Axios from "axios";
import addPictureStyle from "./addPicturesStyle";
import { baseUrl } from "../..";
const { backBoxStyle, boxStyle, titleStyle, acceptButtonStyle, mainBoxStyle } =
  addPictureStyle;

const Input = styled("input")({
  display: "none",
});

function AddPictures(props) {
  const [filesName, setFilesName] = React.useState([]);
  const [files, setFiles] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e) => {
    let names = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 2000000) {
        setFilesName(["MAXIMAL SIZE OF EACH PICTURE IS 2Mb"]);
        return;
      }
      names = names.concat(e.target.files[i].name);
    }
    if (names) {
      setFilesName(names);
    }
    setFiles(e.target.files);
  };
  const handleUpload = () => {
    setLoading(true);
    if (!files || files.length === 0) {
      setLoading(false);
      return setFilesName(["please choose a picture"]);
    }
    setFilesName("");
    const config = {
      headers: {
        "Conten-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("images", files[i], files[i].name);
    }
    Axios.post(baseUrl + "/uploadPictures", fd, config).then(
      (res) => {
        setFilesName();
        setFiles();
        setLoading(false);
        props.setMyTime(new Date());
        setTimeout(() => {
          props.handleClose();
        }, 500);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={() => {
          if (loading) return;
          setFilesName();
          setFiles();
          props.handleClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            ...boxStyle,
            [theme.breakpoints.down("600")]: {
              width: "220px",
              p: 2,
            },
          }}
        >
          <Typography variant="h4" gutterBottom component="div" sx={titleStyle}>
            Add pictures
            <span
              style={{
                fontSize: "40px",
                color: theme.palette.button_orange,
              }}
            >
              .
            </span>
          </Typography>
          <Box sx={mainBoxStyle}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleChange}
              />
              <Button variant="outlined" component="span">
                Choose Pictures
                <DriveFileMoveIcon
                  style={{
                    marginLeft: "20px",
                    transform: "translateY(-4%)",
                  }}
                />
              </Button>
            </label>
            <TableContainer
              maxHeight={250}
              component={Box}
              sx={{
                marginTop: "25px",
              }}
            >
              <Typography variant="h6" gutterBottom component="div" sx={{mb:2}}>
                {filesName &&
                  filesName.length > 1 &&
                  filesName.map((name, index) => (
                    <>
                      <div style={{ textAlign: "center", margin: "0 20px" }}>
                        {index + 1}. {name}
                      </div>
                    </>
                  ))}
                {filesName &&
                  filesName.length === 1 &&
                  filesName.map((name, index) => (
                    <>
                      <div style={{ textAlign: "center" }}>{name}</div>
                    </>
                  ))}
              </Typography>
            </TableContainer>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading}
              sx={acceptButtonStyle}
            >
              Accept
              {loading ? (
                <CircularProgress size={12} sx={{ ml: 2 }} />
              ) : (
                <UploadIcon
                  sx={{
                    marginLeft: "10px",
                    transform: "translateY(25%) scale(1.3)",
                    height: "17px",
                  }}
                />
              )}
            </Button>
          </Box>
          <Box
            sx={backBoxStyle}
            onClick={() => {
              if (loading) {
                return;
              }
              setFilesName();
              setFiles();
              props.handleClose();
            }}
          >
            <ArrowBackIosNewIcon />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default AddPictures;
