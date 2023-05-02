import { theme } from "../../../../theme"

const postStyle = {
  mainBoxStyle: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    justifyContent: "space-between",
    p: 1,
    [theme.breakpoints.down(500)]: {
      m: 1,
    },
    [theme.breakpoints.down(500)]: {
      p: 0,
      m: 1,
    },
  },

 commentBarStyle: {
  display: "flex",
    width: "100%",
      justifyContent: "space-between",
        alignItems: "center",
          margin: "15px 0",
            [theme.breakpoints.down(700)]: {
    flexDirection: "column",
      margin: "0",
  },
} ,

commentFieldStyle: {
  width: "40%",
    minWidth: "100px",
      [theme.breakpoints.down("700")]: {
    width: "70%",
  },
} ,

commentBoxStyle: {
  width: "60%",
    
      margin: "0 auto",
        justifyContent: "center",
          [theme.breakpoints.down(700)]: {
    width: "100%",
  },
} ,

leftIconStyle: {
  cursor: "pointer",
    mr: 1,
      fontSize: "25px",
        transform: "translateY(30%)",
          [theme.breakpoints.down("700")]: {
    transform: "translateY(30%) rotate(90deg)",
  },
}}

export default postStyle