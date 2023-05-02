import add from "../../assets/add.png";
import { theme } from "../../theme";
import {tabsClasses} from "@mui/material";




const mainBoxStyle = {
    display: "flex",
    alignItems:'center', 
    justifyContent: 'center',
    padding: "25px 0",
    margin: "0 20px",
    overflow: "hidden",
    transition: "1.2s",
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }

const userFeedStyle = {

  mainBoxStyle: { display: "flex",
  alignItems:'center',
  
  justifyContent: 'center',
  padding: "25px 0",
  margin: "20px 20px 0",
  overflow: "hidden",
  transition: "1.2s",
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }},


  profilePicPaperStyle: {
    position: 'relative',
    maxWidth: "400px",
    backgroundImage: `url(${add})`,
    boxShadow: "0px 0px 8px 5px rgba(68,68,68,0.49)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "50%",
    borderRadius:'4px',
    overflow:'hidden',
    [theme.breakpoints.down('900')]: { margin: '0 auto' }

  },
  // main Box Style with Pictures tab on



  photoCameraIconStyle: {
    position: 'absolute',
    color: '#BBB',
    top: "2%",
    right: "2%",
    fontSize: "40px",
    transition: "0.4s",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.button_orange,
    }, [theme.breakpoints.down('600')]: {
      fontSize: "20px",
    }
  },

  userInfoStyle: {
    paddingTop: "50px",
    margin: "0 80px",
    justifyContent: "center",
  },
  firstNameStyle: {
    color: theme.palette.font_text,
    [theme.breakpoints.down("md")]: {
      display: "inline",
      mr: 2
    }, [theme.breakpoints.down("600")]: {
      display: "block",
      fontSize: '25px',
      mr: 0
    },
  },

  lastNameStyle: {
    color: theme.palette.font_text,
    textTransform: "uppercase",
    [theme.breakpoints.down('md')]: {
      display: "inline",
    }, [theme.breakpoints.down('600')]: {
      display: "block",
      fontSize: '25px'
    },
  },

  buttonsContainerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "25px 0 ",

  },

  tabStyle: {
    fontSize: "15px",
    marginLeft: "10px",
  },


  infoButtonStyle: {
    [theme.breakpoints.down('500')]: {
      width: '35vw',
      fontSize: '10px'
    }
  },

tabsStyle : {
    textAlign: "center",
    fontSize: "35px",
    marginTop: "25px",
    [`& .${tabsClasses.scrollButtons}`]: {
      color: "white",
      "&.Mui-disabled": { opacity: 0.3 },
    },
  },

profilePaperStyle : {
    position: "relative",
    minWidth: "200px",
    margin: "0 50px",
    overflow: "hidden",
    boxShadow: "0px 0px 7px 4px rgba(68,68,68,0.49)",
    marginBottom: "55px",
    [theme.breakpoints.down("500")]: {
      margin: "0 10px",
    },
  },


}

export default userFeedStyle