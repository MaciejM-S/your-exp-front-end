import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { CircularProgress, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../App";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import registerMenuStyle from "./registerMenuStyle";

const {
  backBoxStyle,
  boxStyle,
  fabStyle,
  titleStyle,
  signInButtonStyle,
  rowBoxStyle,
  helperTextStyle,
  iconStyle,
  aAMembStyle,
  mainInputBoxStyle,
  firstNameStyle,
  lastNameStyle,
  emailStyle,
  passwordStyle,
} = registerMenuStyle;

function SubmitButton(props) {
  return (<Button
    sx={signInButtonStyle}
    size="large"
    variant="outlined"
    endIcon={
      props.loading ? (
        <CircularProgress size={15} />
      ) : (
        <AppRegistrationIcon />
      )
    }
    onClick={props.submitButton}
  >
    Register
  </Button>);
}

export default SubmitButton;