import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const alertStyle = {
  minHeight: "5vh",
  fontSize: "20px",
  padding: "15px",
};

function BlockedAlert(props) {
  const alert = props.alert;

  let stackStyle;

  alert === "none"
    ? (stackStyle = {
        position: "absolute",
        display: alert,
        minWidth: "30%",
      })
    : (stackStyle = {
        position: "fixed",
        display: alert,
        minWidth: "30%",
        top: "50%",
      });

  return (
    <Stack sx={stackStyle}>
      <Alert
        style={alertStyle}
        severity="error"
        color="primary"
        onClose={() => {
          props.setAlert("none");
        }}
      >
        Sorry but you have been blocked by this user.
      </Alert>{" "}
      ;
    </Stack>
  );
}

export default BlockedAlert;
