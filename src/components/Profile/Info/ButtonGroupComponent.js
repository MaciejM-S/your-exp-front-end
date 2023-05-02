import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import infoStyle from "./infoStyle.js";
import { theme } from "../../../theme.js";
import EditIcon from "@mui/icons-material/Edit";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const { cardStyle, arrowBackStyle, cardContentStyle } = infoStyle;


function ButtonGroupComponent(props) {
  return (<ButtonGroup
    sx={{
      margin: "15px 0 35px",
      [theme.breakpoints.down("600")]: {
        margin: "30px 2px 80px",
      },
    }}
    variant="contained"
  >
    <Button
      onClick={() => {
        props.setEdit(true);
      }}
      sx={{
        color: "black",
        [theme.breakpoints.down("500")]: {
          fontSize: "12px",
        },
      }}
    >
      edit user info
      <EditIcon
        sx={{
          marginLeft: "7px",
        }}
      />
    </Button>

    <Button
      variant="outlinde"
      onClick={() => {
        props.setConfidentialitySet(true);
      }}
      sx={{
        color: theme.palette.main_orange,
        border: "1px black solid",
        borderColor: theme.palette.main_orange,
        [theme.breakpoints.down("500")]: {
          fontSize: "12px",
        },
      }}
    >
      edit confidentiality settings
      <AdminPanelSettingsIcon
        sx={{
          marginLeft: "7px",
          transform: "translateY(-7%)",
        }}
      />
    </Button>
  </ButtonGroup>);
}

export default ButtonGroupComponent;

