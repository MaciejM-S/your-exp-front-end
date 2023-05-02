import { theme } from "../../theme";

const topNavStyle = {
  mobileAddCircleStyle: {
    color: "#777",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%) scale(1.5)",
    bottom: "20px",
    borderRadius: "50%",
    p: -1,
    transition: "0.2s",
    fontSize: "40px",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.button_orange,
    },
  },


  tabStyle: {
    transform: "scale(1.5)",
    margin: "0 35x",
    [theme.breakpoints.down("2000")]: {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("1050")]: {
      transform: "scale(0.9)",
      margin: "0 -10px ",
      padding: "0",
    },

    [theme.breakpoints.down("400")]: {
      transform: "scale(0.7)",
      margin: "0 -15px ",
    },
  },

  appBarStyle: {
    display: "flex",
    backgroundColor: theme.palette.lightGray,
    height: "80px",
    flexDirection: "row",
    alignItems: "center",
    padding: "0",
  },

  addCircleIconStyle: {
    color: theme.palette.main_orange,
    borderRadius: "50%",
    transition: "0.2s",
    fontSize: "35px",
    boxShadow: "0px 0px 16px 0px rgba(25, 25, 25, 1)",
    cursor: "pointer",
    ml: 10,
    "&:hover": {
      color: theme.palette.button_orange,
    },
    [theme.breakpoints.up("2000")]: {
      transform: "scale(1.2)",
    },
  },

  userCardBox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 25px",
    padding: "3px 12px",
    borderRadius: "10px",
    border: "1px solid black",
    transition: "0.2s",
    borderColor: theme.palette.lightGray,
    boxShadow: "0px 0px 16px 0px rgba(25, 25, 25, 1)",
    "&:hover": {
      background: "rgba(50, 50, 50, 1)",
    },
  },

  userCardBoxMobile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 25px",
    padding: "3px 12px",
    borderRadius: "10px",
    border: "1px solid black",
    transition: "0.2s",
    borderColor: theme.palette.lightGray,

    boxShadow: "0px 0px 16px 0px rgba(25, 25, 25, 1)",
    "&:hover": {
      background: "rgba(50, 50, 50, 1)",
    },
    [theme.breakpoints.down("500")]: {
      mr: "0px",
      border: "none",
      boxShadow: "none",
    },
    [theme.breakpoints.down("350")]: {
      mr: "-10px",
      border: "none",
      boxShadow: "none",
      transform: "scale(0.8)",
    },
  },

  sTBoxStyle:{
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    ml: 5,
    [theme.breakpoints.up("2000")]: {
      justifyContent: "space-around",
      ml: 25,
    },
  }
};

export default topNavStyle;
