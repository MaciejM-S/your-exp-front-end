import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { theme } from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../App";
import Axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import registerMenuStyle from "./registerMenuStyle";
import FirstLastName from "./FirstLastName";
import Email from "./Email";
import Password from "./Password";
import SubmitButton from "./SubmitButton";
import { baseUrl } from "../../..";
const { backBoxStyle, boxStyle, titleStyle, aAMembStyle, mainInputBoxStyle } =
  registerMenuStyle;

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
const bluredErrors = {
  emailBlured: false,
  firstNameBlured: false,
  lastNameBlured: false,
  passwordBlured: false,
};
function RegisterMenu(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(" ");
  const [firstNameErr, setFirstNameErr] = useState(" ");
  const [lastNameErr, setLastNameErr] = useState(" ");
  const [passwordErr, setPasswordErr] = useState(" ");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(bluredErrors);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const context = React.useContext(Context);

  const emailValidate = (email) => {
    if (!errors.emaileBlured) {
      setErrors({ ...errors, emailBlured: true });
    }
    if (email === "") {
      setEmailErr("Enter email");
      return true;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(" ");
      return false;
    }
    setEmailErr("Invalid email");
    return true;
  };
  const firstNameValidate = (value) => {
    if (!errors.firstNameBlured) {
      setErrors({ ...errors, firstNameBlured: true });
    }
    if (value.trim() === "") {
      setFirstNameErr("Enter first name");
      return true;
    }
    setFirstNameErr(" ");
    return false;
  };
  const lastNameValidate = (value) => {
    if (!errors.lastNameBlured) {
      setErrors({ ...errors, lastNameBlured: true });
    }
    if (value.trim() === "") {
      setLastNameErr("Enter last name");
      return true;
    }
    setLastNameErr(" ");
    return false;
  };
  const passwordValidate = (password) => {
    if (!errors.passwordBlured) {
      setErrors({ ...errors, passwordBlured: true });
    }
    if (password.length < 5) {
      setPasswordErr("At least 5 characters");
      return true;
    }
    setPasswordErr(" ");
    return false;
  };
  const submitButton = () => {
    setLoading(true);
    emailValidate(email);
    firstNameValidate(firstName);
    lastNameValidate(lastName);
    passwordValidate(password);
    if (
      emailValidate(email) ||
      firstNameValidate(firstName) ||
      lastNameValidate(lastName) ||
      passwordValidate(password)
    ) {
      setLoading(false);
      return;
    }
    setErrors({
      emailBlured: true,
      firstNameBlured: true,
      lastNameBlured: true,
      passwordBlured: true,
    });
    Axios.post(baseUrl
      + "/register", {
      firstName,
      lastName,
      email,
      password,
    }).then((response) => {
      if (response.data.error) {
        setEmailErr("email already exists");
        setEmail("");
        return;
      } else {
        localStorage.setItem("token", response.data.newToken);

        setTimeout(() => {
          setLoading(false);
          context.setAuthenticated(true);
          context.setMainDate(new Date().getTime().toString());
          navigate(`home`);
        }, 1200);
      }
    });
  };
  const handleBack = () => {
    setEmailErr(" ");
    setFirstNameErr(" ");
    setLastNameErr(" ");
    setPasswordErr(" ");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setErrors(bluredErrors);
    props.handleClose();
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
          sx={{
            top: "25px",
          }}
        >
          <Box sx={boxStyle}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={titleStyle}
            >
              Create new account
              <span
                style={{
                  fontSize: "40px",
                  color: theme.palette.button_orange,
                }}
              >
                .
              </span>
            </Typography>
            <Typography variant="subtitle" sx={aAMembStyle}>
              Already A Memeber?
              <span
                onClick={() => {
                  props.openRegSignIn();
                }}
                style={{
                  color: theme.palette.button_orange,
                  cursor: "pointer",
                  marginLeft: "4px",
                }}
              >
                Sign In
              </span>
            </Typography>
            <Box component="form" sx={mainInputBoxStyle}>
              <FirstLastName
                firstName={firstName}
                lastName={lastName}
                lastNameErr={lastNameErr}
                firstNameErr={firstNameErr}
                setFirstName={setFirstName}
                setLastName={setLastName}
                errors={errors}
                firstNameValidate={firstNameValidate}
                lastNameValidate={lastNameValidate}
              />
            </Box>
            <Email
              email={email}
              emailErr={emailErr}
              setEmail={setEmail}
              errors={errors}
              emailValidate={emailValidate}
              submitButton={submitButton}
            />
            <Password
              password={password}
              passwordErr={passwordErr}
              setPassword={setPassword}
              errors={errors}
              passwordValidate={passwordValidate}
              submitButton={submitButton}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
            <SubmitButton submitButton={submitButton} loading={loading} />
            <Box sx={backBoxStyle} onClick={handleBack}>
              <ArrowBackIosNewIcon />
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default RegisterMenu;
