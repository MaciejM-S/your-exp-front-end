import { theme } from "../../../theme";


const personStyle = {
  tabStyle: {
    fontSize: "15px",
    margin: "0 25px",
  },

  mainBoxStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "75px",
    [theme.breakpoints.down("1400")]: {
      flexDirection: "column",
      marginTop: "50px",
    },
  },
  profilePaperStyle: {
    width: "90%",
    maxWidth: "400px",
    minWidth: "200px",
    boxShadow: "0px 0px 8px 5px rgba(68,68,68,0.49)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    background:
      "radial-gradient(circle, rgba(142,118,118,1) 7%, rgba(142,118,118,1) 14%, rgba(255,68,0,1) 47%, rgba(97,85,85,1) 70%)",
  },

  blockButtonStyle: {
    background: "rgb(35, 35, 35, 0.92)",
    width: "40%",
    minWidth: "150px",
    [theme.breakpoints.down(400)]: {
      width: "60%",
    },
  },

  dividerStyle: {
    margin: "30px 10% 0",
    [theme.breakpoints.up("lg")]: {
      margin: "60px 10% 0 ",
    },
  },

  buttonGroupStyle: {
    minWidth: "150px",
    marginBottom: "15px",
    background: "rgb(35, 35, 35, 0.92)",
    border: "1px solid #999",
    [theme.breakpoints.down(400)]: {
      margin: "10px 10px",
    },
  },
  removeButtonStyle: {
    background: "rgb(35, 35, 35, 0.92)",
    width: "100%",
    minWidth: "150px",
  },

  buttonBoxStyle: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
  },
};

export default personStyle;
