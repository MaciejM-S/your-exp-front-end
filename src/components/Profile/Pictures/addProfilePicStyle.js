import { theme } from "../../../theme"

const addProfilePicStyle = {
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
      background: "#080808"
    }, [theme.breakpoints.down('600')]: {
      top: "0px",
      left: "0px",
      transform: 'translateY(-50%)'
    }
  },
  boxStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: "rgba(33, 33, 33, 0.96)",
    border: '2px solid #000',
    boxShadow: 24,
    padding: "35px 15px 0px",
    color: "white",
    [theme.breakpoints.down('600')]: {
      width: '240px',
      margin: '0',
    }
  },
  titleStyle: {
    textAlign: "center",
    marginTop: "-10px",
  },
  acceptButtonStyle: {
    color: 'white',
    cursor: 'pointer',
    fontSize: "18px",
    padding: "7px 12px 5px",
    marginBottom: "25px"
  },
  uploadIconStyle: {
    marginLeft: "10px",
    transform: 'translateY(25%) scale(1.3)',
    height: "17px",
  },
}

export default addProfilePicStyle