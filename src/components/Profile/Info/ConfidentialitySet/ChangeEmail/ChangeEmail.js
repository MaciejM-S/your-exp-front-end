import * as React from "react";
import { theme } from "../../../../../theme";
import {
  Divider,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import validateEmail from "../../../../../functions/validateEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import axios from "axios";
import { baseUrl } from "../../../../..";

const mainBoxStyle = {
  display: "flex",
  overflow: "hidden",
  flexWrap: "wrap",
  alignItems: "center",
  "& > :not(style)": { m: 1 },
  [theme.breakpoints.down(600)]:{
    flexDirection:'column'
  }
}
const inputWidth = "200px";
function ChangeEmail() {
  const [newEmail, setNewEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(" ");
  const [passwordError, setPasswordError] = React.useState(" ");
  const [showPassword, setShowPassword] = React.useState(false);
  const [accept, setAccept] = React.useState(true);

  let valdiationFlag = true;
  const validate = () => {
    if (password.trim() !== "") {
      setPasswordError(" ");
      valdiationFlag = true;
    }
    if (validateEmail(newEmail)) {
      setEmailError(" ");
      valdiationFlag = true;
    }
    if (newEmail.trim() === "") {
      setEmailError("please input new e-mail adress");
      valdiationFlag = false;
    }
    if (!validateEmail(newEmail)) {
      setEmailError("please input correct e-mail adress");
      valdiationFlag = false;
    }
    if (newEmail.trim() === "") {
      setEmailError("please input new e-mail adress");
      valdiationFlag = false;
    }
    if (password.trim() === "") {
      setPasswordError("please input password");
      valdiationFlag = false;
    }
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  
  const handleAccept = () => {
    if (!valdiationFlag) {
      return;
    }
    axios
      .post(
        baseUrl
        + "/changeEmail",
        {
          newEmail: newEmail,
          password: password,
        },
        config
      )
      .then((res) => {
        if (res.data === "emailChanged") {
          setAccept(false);
        }

        if (res.data === "wrongPassword") {
          setPasswordError("incorrect password");
        }
      });
  };

  return (
    <>
      <ListItem sx={{ marginTop: "15px", [theme.breakpoints.down(600)]:{
        display:'flex',
        flexDirection:'column'
      } }}>
        <EmailIcon variant="confidential" sx={{[theme.breakpoints.down(600)]:{ margin:'0 auto'}}}/>
        <Typography variant="confidentialityVariant">Change email:</Typography>
        <Box
          sx={mainBoxStyle}
        >
          <FormControl sx={{ transform: "translateY(15%)" }}>
            <InputLabel
              color="input"
              size="small"
              htmlFor="filled-adornment-password"
            >
              New email
            </InputLabel>
            <OutlinedInput
              size="small"
              color="input"
              id="filled-adornment-password"
              label="Password"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              sx={{
                width: inputWidth,
              }}
            />
            <FormHelperText sx={{ color: theme.palette.main_orange }}>
              {emailError}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ transform: "translateY(15%)" }}>
            <InputLabel
              color="input"
              size="small"
              htmlFor="outlined-adornment-password"
            >
              Current password
            </InputLabel>
            <OutlinedInput
              size="small"
              color="input"
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              label="Current password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              FormHelperTextProps={{
                sx: {
                  color: theme.palette.button_orange,
                },
              }}
              sx={{
                width: inputWidth,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText sx={{ color: theme.palette.main_orange }}>
              {passwordError}
            </FormHelperText>
          </FormControl>
          {accept ? (
            <Button
              onClick={
                () => {
                  validate();
                  handleAccept();
                }}
              variant="outlined"
              sx={{
                height: "55px",
                marginLeft: "25px",
                width: "100px",
                transform: "translateY(-4%)",
              }}
            >
              accept
            </Button>
          ) : (
            <Typography
              color="primary"
              sx={{
                textTransform: "uppercase",
                fontSize: "15px",
                transform: "translateY(-45%)",
                borderBottom: `solid 1px ${theme.palette.main_orange}`,
              }}
            >
              email has been changed
            </Typography>
          )}
        </Box>
      </ListItem>
      <Divider
        sx={{
          marginTop: "25px",
        }}
        variant="middle"
      />
    </>
  );
}

export default ChangeEmail;
