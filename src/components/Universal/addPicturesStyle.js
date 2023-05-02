import { theme } from "../../theme"


const addPictureStyle = {
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
    width: 400,
    bgcolor: "rgba(33, 33, 33, 0.96)",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "15px 15px",
    color: "white",

  },

  titleStyle: {
    textAlign: "center",
    marginTop: "-10px",
    [theme.breakpoints.down("600")]: {
      fontSize: "20px",
    },
  },
  accepButtonStyle: {
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    padding: "5px 12px",
    marginTop: "25px",
    marginBottom: "10px",
  },
  mainBoxStyle:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
    justifyContent: "space-between",
  }


}


export default addPictureStyle