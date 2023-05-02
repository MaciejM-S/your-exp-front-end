import { theme } from "../../theme";

const initFeedStyle = {
  paperStyle: {
    backgroundColor: "rgb(21, 21, 21, 0.92)",
    color: "#E5E5E5",
    margin: "30% auto",
    padding: "15px",
    boxShadow: " 0 0 5px 2px black",
    fontWeight: "300",
    fontFamily: "roboto",
    fontSize: "50px",
    [theme.breakpoints.up("2000")]: {
      fontSize: "70px",
    },
    [theme.breakpoints.down("600")]: {
      fontSize: "35px",
      padding: "15px 0",
    },
  },
  mainDivStyle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default initFeedStyle;
