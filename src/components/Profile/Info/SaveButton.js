import SaveIcon from "@mui/icons-material/Save";
import { Button, ButtonGroup } from "@mui/material";

function SaveButton(props) {
  return (  <Button
    variant="contained"
    onClick={props.save}
    sx={{
      color: "black",
      padding: "10px 25px",
      margin: "25px 0 20px",
    }}
  >
    save
    <SaveIcon
      sx={{
        paddingLeft: "5px",
        transform: "translateY(-5%)",
      }}
    />
  </Button> );
}

export default SaveButton;