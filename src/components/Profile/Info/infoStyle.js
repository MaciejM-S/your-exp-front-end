import { theme } from "../../../theme"

 const infoStyle  = {

    backBoxStyle  : {
    position: "absolute",
    zIndex: 4,
    padding: "6px",
    top: "2px",
    left: "-20px",
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
  } ,
  
    cardStyle  : {
    background: "transparent",
    position: "relative",
    margin: "0 auto",
    maxWidth: "1000px",
    transition: "0.4s",
    boxShadow:'none'
  } ,
  
    arrowBackStyle  : {
    position: "absolute",
    zIndex: 4,
    padding: "6px",
    top: "2px",
    left: "-20px",
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
    [theme.breakpoints.down(600)]: {
      left: "5px",
    },
  } ,
  
    cardContentStyle  : {
    position: "relative",
    margin: "0 auto",
    width: "50%",
    minWidth: "360px",
    [theme.breakpoints.down("600")]: {
      width: "80%",
      minWidth: "0",
    },
  } ,
}
export default infoStyle