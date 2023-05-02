import * as React from "react";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../App";
import signInMenuStyle from "./forgottenPasswordStyle";
import Email from "./Email";
import OutboxIcon from '@mui/icons-material/Outbox';
import { baseUrl } from "../../..";
const {
  backBoxStyle,
  boxStyle,
  titleStyle,
  signInButtonStyle,
} = signInMenuStyle;

function ForgottenPassword(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(" ");
  const [passwordErr, setPasswordErr] = useState(" ");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (email === "" ) {
        setEmailErr("Enter email"); 
        return setLoading(false);
    }
    axios
      .post(baseUrl
        + "/resetPassword", { email })
      .then((res) => {
        if (res.data) {
        
        }
        if (res.data === "incorrect") {
          setEmailErr("incorrect email");
          setLoading(false);
        }
        if (res.data === "correct") {
          setEmailErr("We sent a new password to your email");
          setLoading(false);
        }
      });
  };
  const handleGoBack = () => {
    setEmail("");
    setPassword("");
    setEmailErr(" ");
    setPasswordErr(" ");
    props.handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={
         props.open
        }
        onClose={handleGoBack}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={boxStyle}>
          <Typography variant="h5" gutterBottom component="div" sx={titleStyle}>
            Restoring password
            <span
              style={{
                fontSize: "50px",
                color: theme.palette.button_orange,
              }}
            >
              .
            </span>
          </Typography>

          <Email
            emailErr={emailErr}
            email={email}
            setEmail={setEmail}
            loading={loading}
            handleSubmit={handleSubmit}
            setEmailErr={setEmailErr}
          />

          <Button
            sx={signInButtonStyle}
            disabled={loading}
            size="large"
            variant="outlined"
            endIcon={!loading ? <OutboxIcon  /> : <CircularProgress size={20} />}
            onClick={handleSubmit}
          >
            Reset password
          </Button>

          <Box sx={backBoxStyle} onClick={handleGoBack}>
            <ArrowBackIosNewIcon />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default ForgottenPassword;
