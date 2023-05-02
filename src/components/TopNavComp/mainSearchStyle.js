import { theme } from "../../theme"


const mainSearchStyle = {
  
  searchIconStyle : {
  marginRight: "5px",
  display: "flex",
  [theme.breakpoints.down("md")]: { marginLeft: "20px" },
  [theme.breakpoints.down("600")]: {
    position: "fixed",
    left: "calc(20px + 5%)",
    top: "45px",
  },
  [theme.breakpoints.down("400")]: {
    position: "fixed",
    left: "calc(20px + 5%)",
    top: "45px",
    marginLeft: "-20px",
  },
},
 mainBoxStyle : {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  background: "rgba(30, 30, 30, 0.8)",
  color: "#E5E5E5",
  p: 1,
  borderRadius: "5px",
  border: "1px solid rgba(130, 130, 130, 0.8)",
  transition: "0.6s",
  minHeight: "45px",
  "&:hover": { borderColor: theme.palette.main_orange },
},

  boxStyle : {
  display: "flex",
  position: "relative",
  alignItems: "center",
  ml: "-8px",
  [theme.breakpoints.up("2000")]: {
    ml: "12%",
  },
},

  formHeleperTextStyle :
{position: "absolute",
color: "#DDD",
fontWeight: 500,
background: theme.palette.nav,
width: "100px",
border: "1px solid black",
borderRadius: "4px",
padding: "2px 5px",
bottom: "0",
left: "-10px",
transform: "translateY(120%)"},

  cancelIconStyle : {
  display: "none",
  fontSize: "30px",
  transition: "0.6s",
  [theme.breakpoints.down("md")]: {
    display: "block",
    position: "fixed",
    top: "108px",
  },
},

  circularProgressStyle : {
  position: "absolute",
  right: "10px",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    left: "145px",
    top: "103px",
    marginLeft: "0px",
  },
}
}


export default mainSearchStyle