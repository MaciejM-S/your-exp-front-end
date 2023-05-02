import * as React from "react";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { CircularProgress, TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../App";
import signInMenuStyle from "./signInMenuStyle";
import Email from "./Email";
import Password from "./Password";
import { baseUrl } from "../../..";
const {
  backBoxStyle,
  boxStyle,
  titleStyle,
  signInButtonStyle,
  aAMembStyle
} = signInMenuStyle;

function SignInMenu(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(" ");
  const [passwordErr, setPasswordErr] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const context = useContext(Context);

  const handleSubmit = () => {
    setLoading(true);
    if (email === "" || password === "") {
      if (email === "") {
        setEmailErr("Enter email");
      }
      if (password === "") {
        setPasswordErr("Enter password");
      }
      return setLoading(false);
    }
    axios
      .post(baseUrl
        + "/signin", { email, password })
      .then((res) => {
        if (res.data.newToken) {
          localStorage.setItem("token", res.data.newToken);
          context.setMainDate(new Date().getTime().toString());
          context.setAuthenticated(true);
          setTimeout(() => {
            setLoading(false);
            // navigate(`profile/info`);
            props.handleClose();
          }, 1500);
        }
        if (res.data === "incorrect") {
          setEmailErr("incorrect login details (email or/and password)");
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
        open={props.open}
        onClose={handleGoBack}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={boxStyle}>
          <Typography variant="h4" gutterBottom component="div" sx={titleStyle}>
            Sign in
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

          <Password
            handleSubmit={handleSubmit}
            password={password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setPasswordErr={setPasswordErr}
            setPassword={setPassword}
            passwordErr={passwordErr}
            loading={loading}
          />
   <Typography variant="subtitle" sx={aAMembStyle}>
            Have you forgotten your password?
              <span
                onClick={() => {
                  handleGoBack()
                  props.openForgottenPassword();
                }}
                style={{
                  display:'block',
                  color: theme.palette.button_orange,
                  cursor: "pointer",
                }}
              >
                Reset password
              </span>
            </Typography>

          <Button
            sx={signInButtonStyle}
            disabled={loading}
            size="large"
            variant="outlined"
            endIcon={!loading ? <LoginIcon /> : <CircularProgress size={20} />}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
          

          <Box sx={backBoxStyle} onClick={handleGoBack}>
            <ArrowBackIosNewIcon />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default SignInMenu;
