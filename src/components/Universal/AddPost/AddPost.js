import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  TextField,
  TableContainer,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import PublicationsRange from "./PublicationsRange";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Axios from "axios";
import addPostStyle from "./addPostStyle";
import PublishButton from "./PublishButton";
import { Context } from "../../../App";
import { baseUrl } from "../../..";
const {
  mainContainerStyle,
  boxStyle,
  firstRowStyle,
  backBoxStyle,
  sentPostInfo,
  titleMinorStyle,
  descriptionStyle,
  titleStyle
} = addPostStyle;

const Input = styled("input")({
  display: "none",
});

function AddPost(props) {
  const [filesName, setFilesName] = React.useState([]);
  const [files, setFiles] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [range, setRange] = React.useState("friends");
  const [titleError, setTitleError] = React.useState(" ");
  const [descriptionError, setDescriptionError] = React.useState(" ");
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [loadingCompleted, setLoadingCompleted] = React.useState(false);
  const context = React.useContext(Context)
  const handleChange = (e) => {
    let names = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 2000000) {
        setFilesName(["maximal size of each picture is 2Mb"]);
        return;
      }
      names = names.concat(e.target.files[i].name);
    }
    if (names) {
      setFilesName(names);
    }
    setFiles(e.target.files);
  };
  const config = {
    headers: {
      "Conten-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleUpload = () => {
    if (title === "") {
      setTitleError("please enter post title");
      return;
    }
    setLoadingPost(true);
    setFilesName("");
    let fd = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i], files[i].name);
      }
    }
    fd.append("title", title);
    fd.append("description", description);
    fd.append("range", range);
    Axios.post(baseUrl + "/addPost", fd, config).then((res) => {
      setFilesName();
      setFiles();
     
      setLoadingCompleted(true);
      setTitle("");
      setDescription("");
      setTimeout(() => {
        setLoadingPost(false);
        props.handleClose();
        context.setPostAdded(new Date().getTime().toString())
        props.setDate(new Date().getTime().toString());
        setLoadingCompleted(false);
      }, 2000);
    });
  };


  const handleTitle = (e) => {
    if (e.target.value.length > 40) {
      return setTitleError("maximal title length is 30 characters");
    }
    setTitle(e.target.value);
    if (e.target.value === "") {
      setTitleError("please input post title");
    } else {
      setTitleError(" ");
    }
  };
  const handleDescription = (e) => {
    if (e.target.value.length > 300) {
      return setTitleError("maximmu description length is 300 characters");
    } else {
      setDescriptionError(" ");
    }
    setDescription(e.target.value);
  };
  const handleBack = () => {
    setTitle("");
    setDescription("");
    setFilesName(null);
    setFiles();
    props.handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        sx={{ height: "100%", width: "100%" }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open || false}
        onClose={handleBack}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <TableContainer sx={mainContainerStyle}>
          <Box sx={boxStyle}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={titleMinorStyle}
            >
              Add post
              <span
                style={{
                  fontSize: "40px",
                  color: theme.palette.button_orange,
                }}
              >
                .
              </span>
            </Typography>
            <Box sx={firstRowStyle}>
              <TextField
                fullWidth
                sx={titleStyle}
                label="title"
                onChange={handleTitle}
                id="fullWidth"
                value={title}
                FormHelperTextProps={{
                  sx: { color: theme.palette.main_orange },
                }}
                helperText={titleError}
              />
              <TextField
                fullWidth
                sx={descriptionStyle}
                minRows={2}
                label="description"
                id="fullWidth"
                multiline={true}
                value={description}
                FormHelperTextProps={{
                  sx: { color: theme.palette.main_orange },
                }}
                helperText={descriptionError}
                onChange={handleDescription}
              />
              <PublicationsRange setRange={setRange} />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleChange}
                />
                <Button variant="outlined" component="span">
                  Add Pictures
                  <DriveFileMoveIcon
                    style={{ marginLeft: "20px", transform: "translateY(-4%)" }}
                  />
                </Button>
              </label>
              <TableContainer
                sx={{
                  mt: 1,
                  maxHeight: 100,
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{
                    paddingTop: "15px",
                    textAlign: "center",
                  }}
                >
                  {filesName &&
                    filesName.length > 1 &&
                    filesName.map((name, index) => (
                      <>
                        <div key={index}>
                          {index + 1}. {name}
                        </div>
                      </>
                    ))}
                  {filesName &&
                    filesName.length === 1 &&
                    filesName.map((name, index) => (
                      <>
                        <div key={index}>{name}</div>
                      </>
                    ))}
                </Typography>
              </TableContainer>
              {loadingCompleted ? (
                <Typography sx={sentPostInfo}>You have sent a post</Typography>
              ) : (
                <PublishButton
                  handleUpload={handleUpload}
                  laodingPost={loadingPost}
                />
              )}
            </Box>
            <Box sx={backBoxStyle} onClick={handleBack}>
              <ArrowBackIosNewIcon />
            </Box>
          </Box>
        </TableContainer>
      </Modal>
    </ThemeProvider>
  );
}

export default AddPost;
