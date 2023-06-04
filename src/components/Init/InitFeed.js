import { React, useRef, useState, useEffect, useContext } from "react";
import {ThemeProvider, styled } from "@mui/material/styles";
import { Paper, Button, ButtonGroup, Box } from "@mui/material";
import { theme } from "../../theme";
import Typewriter from "typewriter-effect";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SignInMenu from "./SignInMenu/SignInMenu";
import RegisterMenu from "./RegisterMenu/RegisterMenu";
import ForgottenPassword from "./ForgottenPassword/ForgottenPassword";
import Axios from "axios";
import CircularProgressComponent from "./../Universal/CircularProgressComponent";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import initFeedStyle from './initFeedStyle'
import { baseUrl } from "../..";

const ButtonMain = styled(Button)({
  margin: "10px auto 0 ",
  width: "150px",
  "&:hover": {
    backgroundColor: theme.palette.button_orange,
    color: "#000",
  },
  [theme.breakpoints.down("600")]: {
    width: "120px",
  },
});

const {
  paperStyle,
  mainDivStyle } = initFeedStyle

function InitFeed() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotten, setOpenForgotten] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(false);
  const [userFirstName, setUserFirstName] = useState();
  const navigate = useNavigate();
  const context = useContext(Context);
  const paper = useRef();
   const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    if (context && context.authenticated) {
      navigate("home");
    }
  });
  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleCloseForgotten= () => setOpenForgotten(false);
  const openForgottenPassword = () => setOpenForgotten(true);
  const openRegSignIn = () => {
    setOpenRegister(false);
    setOpenSignIn(true);
  };

  useEffect(() => {
    Axios.get(baseUrl
      + "/init", config).then((response) => {
      if (response.data !== "notLogged") {
        setUserFirstName(response.data);
        setUserStatus(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <CircularProgressComponent />
        </Box>
      </>
    );
  }

  else if (!userStatus) {
    return (
      <ThemeProvider theme={theme}>
        <div
          style={{ ...mainDivStyle, display: openSignIn || openRegister ? "none" : "block", }}
          ref={paper}
        >
          <Paper sx={paperStyle}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("All people,")
                  .pauseFor(1500)
                  .deleteAll()
                  .pauseFor(1200)
                  .typeString("all pathways")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("in one place.")
                  .pauseFor(1300)
                  .deleteAll()
                  .pauseFor(800)
                  .typeString("Create your expanse.")
                  .start();
              }}
            />
            <Box display={"flex"}>
              <ButtonGroup
                size="large"
                variant="text"
                aria-label="text button group"
                sx={{
                  margin: "10px auto 5px",
                }}
              >
                <ButtonMain endIcon={<LoginIcon />} onClick={handleOpenSignIn}>
                  Sign in
                </ButtonMain>

                <ButtonMain
                  endIcon={<AppRegistrationIcon />}
                  onClick={handleOpenRegister}
                >
                  Register
                </ButtonMain>
              </ButtonGroup>
              <SignInMenu 
              open={openSignIn} 
              handleClose={handleCloseSignIn} 
              openForgottenPassword={openForgottenPassword}
              />
              <RegisterMenu
                open={openRegister}
                handleClose={handleCloseRegister}
                openRegSignIn={openRegSignIn}
              />
              <ForgottenPassword
                handleClose={handleCloseForgotten}
              open={openForgotten}
              />
            </Box>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

export default InitFeed;
