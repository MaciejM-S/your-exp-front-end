 import { theme } from "../../../../theme"
 
 const personFriendsStyle  = {
    mainBoxStyle  : {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    color: "white",
    alignItems: "center",
    margin: "15px auto",
  },
    avatarStyle  : {
    width: "150px",
    height: "150px",
    background:
      "radial-gradient(circle, rgba(142,118,118,1) 8%, rgba(59,53,51,1) 97%)",
  },
  
    dividerStyle  : {
    color: "white",
    width: "50%",
    minWidth: "200px",
    margin: "5px auto",
  },
  
    youFriendsStyle  : {
    color: theme.palette.main_orange,
    textTransform: "uppercase",
    width: "15%",
    minWidth: "100px",
  },
}

export default personFriendsStyle