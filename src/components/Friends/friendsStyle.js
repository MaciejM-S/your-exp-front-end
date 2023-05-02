import { theme } from "../../theme"

const friendsStyle = {
  listItemStyle: {
    border: "solid black 1px",
    height: "70px",
    borderRadius: "3px",
    margin: "5px 15px 0 0",
    transition: "0.7s",
    
  },

  mainBoxStyle: {
    position: "fixed",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    top: "80px",
    height: "100vh",
    color: "white",
    fontWeight: "600",
    padding: "15px 0",
    borderRight: "1px solid #090909",
    paddingLeft: "5%",
  },

  mobileMainBoxStyle: {
    position: "fixed",
    background: "#121212",
    background: "rgba(18,18,18,0.94)",
    left: 0,
    top: 80,
    width: "100%",
    display: "block",
    zIndex: "150",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  outletStyle: {
    position: "absolute",
    left: 0,
    width: "100%",
    marginTop: "55px",
    paddingBottom: "70px"
    
  },
}

export default friendsStyle