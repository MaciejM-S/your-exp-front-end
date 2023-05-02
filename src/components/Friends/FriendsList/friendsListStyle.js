import { theme } from "../../../theme";

const friendsListStyle = {
  mainBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    color: "white",
    alignItems: "center",
    margin: "1% auto",
    p: 2,
  },

  avatarStyle: {
    width: "150px",
    height: "150px",
    background:
      "radial-gradient(circle, rgba(142,118,118,1) 8%, rgba(59,53,51,1) 97%)",
  },

  infoStyle: {
    textAlign: "center",
    m: 4,
    cursor: "pointer",
    width: "10%",
    minWidth: "200px",
  },

  buttonGroupStyle: {
    minWidth: "150px",
    marginBottom: "15px",
    background: "rgb(35, 35, 35, 0.92)",
    borderColor: "white",
  },

  removeButtonStyle: {
    background: "rgb(35, 35, 35, 0.92)",
    width: "100%",
    minWidth: "150px",
    [theme.breakpoints.down(400)]: {
      fontSize: "10px",
    },
  },

  blockButtonStyle: {
    background: "rgb(35, 35, 35, 0.92)",
    width: "40%",
    minWidth: "150px",
    [theme.breakpoints.down(400)]: {
      fontSize: "10px",
    },
  },

  dividerStyle: {
    color: "white",
    width: "60%",
    minWidth: "200px",
    margin: "0 auto",
  },
};

export default friendsListStyle;
