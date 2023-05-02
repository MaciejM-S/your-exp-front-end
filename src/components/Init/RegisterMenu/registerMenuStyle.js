import { theme } from "../../../theme" 


  const registerMenuStyle ={

    backBoxStyle : {
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
    [theme.breakpoints.down("400")]: {
      top: "-3px",
      left: 0,
      transform: "scale(0.8)",
    },
  } ,
  
    boxStyle : {
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
    [theme.breakpoints.down("600")]: {
      width: "300px",
      minHeight: 200,
    },
    [theme.breakpoints.down("400")]: {
      width: "200px",
    },
  } ,
  
    fabStyle : {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "black",
    color: theme.palette.button_orange,
    opacity: "0.9",
    "&:hover": {
      background: "#000",
      color: "#E5E5E5",
    },
  } ,
    titleStyle : {
    textAlign: "center",
    marginBottom: "25px",
    [theme.breakpoints.down("400")]: {
      fontSize: "20px",
    },
  } ,
    signInButtonStyle : {
    display: "flex",
    margin: "0px auto 25px",
    "&:hover": {
      backgroundColor: theme.palette.button_orange,
      color: "#000",
    },
  } ,
  
    rowBoxStyle : {
    display: "flex",
    alignItems: "center",
    p: "2px 4px",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("600")]: {},
  } ,
  
    helperTextStyle : {
    color: theme.palette.main_orange,
    fontSize: "10px",
    height: "30px",
    [theme.breakpoints.down(600)]: {
      fontSize: "8.5px",
      textAlign: "center",
    },
  } ,
  
    iconStyle : {
    mb: 3,
    mr: 2,
    [theme.breakpoints.down("600")]: {
      transform: "scale(0.8)",
    },
    [theme.breakpoints.down("400")]: {
      transform: "scale(0.7)",
    },
  } ,
  
    aAMembStyle : {
    fontSize: "17px",
    display: "block",
    fontWeight: "300",
    margin: "-10px 0 20px",
    textAlign: "center",
    [theme.breakpoints.down("400")]: {
      fontSize: "12px",
    },
  }  ,
  
    mainInputBoxStyle :{
    p: "2px 4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "0 auto",
  },
  
    firstNameStyle:{
    width: "150px",
    [theme.breakpoints.down("600")]: { width: "100px" },
    [theme.breakpoints.down("400")]: { width: "72px" },
  },
    lastNameStyle : {
    width: "150px",
    marginLeft: "26px",
    mr: 1,
    [theme.breakpoints.down("600")]: {
      width: "100px",
      ml: 1,
      mr: 0,
    },
    [theme.breakpoints.down("400")]: { width: "73px" },
  },
  
    emailStyle : {
    width: "330px",
    [theme.breakpoints.down("600")]: { width: "210px", ml: 1 },
    [theme.breakpoints.down("400")]: { width: "160px" },
  },
  
    passwordStyle : {
    width: "330px",
    [theme.breakpoints.down("600")]: { width: "210px", ml: 1 },
    [theme.breakpoints.down("400")]: { width: "138px" },
  },
  
}

export default registerMenuStyle