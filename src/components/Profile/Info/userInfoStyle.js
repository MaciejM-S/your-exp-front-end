import { theme } from "../../../theme"

const userInfoStyle = {
  mainBoxStyle: {
    display: "flex",
    justifyContent: "center",
    margin: "25px auto",
    padding: "3px 0",
    [theme.breakpoints.down("600")]: {
      margin: "25px 0",
    },
  },
  textFieldStyle: {
    position: "static",
    transform: "translateY(-28%)",
    height: "25px",
    marginLeft: "20px",
    left: "125px",
    minWidth: "200px",
    width: "60%",
    padding: "5px 0",
    [theme.breakpoints.down("600")]: {
      width: "200px",
      minWidth: 0,
    },
    [theme.breakpoints.down("600")]: {
      width: "130px",
      minWidth: 0,
    },
  },
  featureStyle: {
    fontSize: 22,
    color: "#DDD",
    width: "140px",
    marginLeft: "50px",
    [theme.breakpoints.down(600)]: {
      fontSize: 15,
      minWidth: 100,
      ml: 0,
    },
  },
    editModeIconStyle: {
    position: "relative",
    paddingLeft: "10px",
    fontSize: "25px",
    transform: "translateY(5%)",
    cursor: "pointer",
  },
    valueStyle: {
    position: "relative",
    display: "flex",
    width: "60%",
    textAlign: "left",
    [theme.breakpoints.down(600)]: {
      width: "60%",
    },
  },
    addIconStyle: {
    paddingLeft: "10px",
    fontSize: "30px",
    cursor: "pointer",
    color: theme.palette.main_orange,
  },
    featureTypography: {
    fontSize: 22,
    color: "#DDD",
    width: "120px",
    [theme.breakpoints.down("600")]: {
      width: "100px",
      fontSize: 16,
    },
    [theme.breakpoints.down("400")]: {
      width: "70px",
    },
  },
}

export default userInfoStyle