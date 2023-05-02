import { theme } from "../../../../../theme"

const picturePostStyle = {
  navBarStyle: {
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

   postTitleStyle: {
    [theme.breakpoints.down("600")]: {
      marginTop: "105px",
      width: "85%",
      fontSize: "15px",
    },
  },

   commentsBarStyle: {
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
}


export default picturePostStyle