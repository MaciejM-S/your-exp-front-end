import { theme } from "../../../../../theme";


const profilePicStyle = {
  mainCardStyle: {
    margin: "15px",
    [theme.breakpoints.down("800")]: {
      margin: "10px 0",
    },
  },

  mainBoxStyle: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    justifyContent: "space-between",
    p: 1,
    [theme.breakpoints.down("600")]: {
      p: 0,
      mb: 8,
    },
  },

  changedProfileStyle: {
    [theme.breakpoints.down("600")]: {
      marginTop: "105px",
      width: "85%",
      fontSize: "15px",
    },
  },

  commentsBoxStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column",
      margin: "0",
    },
  },

  commentBoxStyle: {
    width: "60%",
    margin: "0 auto",
    justifyContent: "center",
    [theme.breakpoints.down(700)]: {
      width: "100%",
    },
  },

  leftIconStyle: {
    cursor: "pointer",
    mr: 1,
    fontSize: "25px",
    transform: "translateY(30%)",
    [theme.breakpoints.down("700")]: {
      transform: "translateY(30%) rotate(90deg)",
    },
  },

  commentInputStyle: {
    width: "40%",
    minWidth: "100px",
    [theme.breakpoints.down("700")]: {
      width: "70%",
    },
  },
};

export default profilePicStyle
