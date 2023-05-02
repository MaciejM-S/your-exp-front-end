import { theme } from "../../../theme";

const addPostStyle = {
  mainContainerStyle: {
    maxHeight: "100vh",
    position: "absolute",
    left: "50%",
    top: "50vh",
    transform: "translate(-48%, -50%)",
    width: 400,
    [theme.breakpoints.down("450")]: {
      display: "block",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      width: 250,
      textAlign: "center",
      maxHeight: "100vh",
    },
  },
  boxStyle: {
    p: 3,
    m: 0,
    width: 330,
    bgcolor: "rgba(33, 33, 33, 0.96)",
    border: "2px solid #000",
    boxShadow: 24,
    color: "white",
    [theme.breakpoints.down("450")]: {
      width: 230,
      p: 1,
    },
    maxHeight: "100vh",
  },
  firstRowStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
    justifyContent: "space-between",
    [theme.breakpoints.down("450")]: {
      margin: "20px 0 0",
    },
  },
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
    [theme.breakpoints.down("450")]: {
      left: "5px",
    },
  },

  sentPostInfo: {
    color: theme.palette.main_orange,
    fontSize: "18px",
    fontWeight: 700,
    padding: "10px 12px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "180px",
    height: "50px",
  },

  titleMinorStyle: {
    textAlign: "center",
  },

  descriptionStyle:{
    m: 3,
    mt: 1,
    [theme.breakpoints.down("450")]: {
      m: 1,
    },
  },
  titleStyle:{
    m: 3,
    mt: 1,
    [theme.breakpoints.down("450")]: {
      m: 1,
    },
  }
};

export default addPostStyle;
