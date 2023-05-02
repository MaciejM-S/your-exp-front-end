import { theme } from "../../../theme";

const forgottenPasswordStyle = {
  backBoxStyle: {
    position: "absolute",
    padding: "6px",
    top: "15px",
    left: "10px",
    transition: "0.25s",
    borderRadius: "50%",
    opacity: "0.95",
    background: "black",
    cursor: "pointer",
    lineHeight: "15px",
    "&:hover": {
      color: theme.palette.button_orange,
      background: "#080808",
    },
  },
  boxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    minHeight: 150,
    bgcolor: "rgba(33, 33, 33, 0.96)",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "15px 15px",
    color: "white",
    [theme.breakpoints.down("md")]: {
      width: "350px",
      minHeight: 200,
    },
    [theme.breakpoints.down("400")]: {
      width: "260px",
    },
  },
  rowBoxStyle: {
    p: "2px 4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    m:'20px 0 10px'
  },
  titleStyle: {
    textAlign: "center",
    marginTop: "-10px",
    marginBottom:'10px',
  },
  signInButtonStyle: {
    display: "flex",
    margin: "0 auto 20px",
    "&:hover": {
      backgroundColor: theme.palette.button_orange,
      color: "#000",
    },
  },
  iconFirstRow: {
    padding: "1px",
    width: "25px",
    transform: "translateY(-25%)",
    marginRight: "15px",
  },
  iconSecondRow: {
    padding: "1px",
    width: "25px",
    transform: "translateY(-25%)",
    marginRight: "15px",
  },
};

export default forgottenPasswordStyle;
