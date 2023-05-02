import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { theme } from "../../../theme";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import registerMenuStyle from "./registerMenuStyle";

const {
  rowBoxStyle,
  helperTextStyle,
  iconStyle,
  firstNameStyle,
  lastNameStyle,
} = registerMenuStyle;

function FirstLastName(props) {
  const handleFNChange = (e) => {
    e.preventDefault();
    props.setFirstName(e.target.value.trim());
    if (!props.errors.firstNameBlured) {
      return;
    }
    props.firstNameValidate(e.target.value);
  };

  const handleLNChange = (e) => {
    e.preventDefault();
    props.setLastName(e.target.value.trim());
    if (!props.errors.lastNameBlured) {
      return;
    }
    props.lastNameValidate(e.target.value);
  };

  return (
    <Box
      style={{
        ...rowBoxStyle,
        marginTop: "6px",
      }}
    >
      <Box
        sx={{
          ...iconStyle,
          [theme.breakpoints.down("600")]: {
            ...iconStyle,
            top: "34%",
          },
          [theme.breakpoints.down("400")]: { iconStyle },
        }}
        aria-label="menu"
      >
        <PersonOutlineIcon sx={{ fontSize: "30px" }} />
      </Box>
      <TextField
        size="small"
        helperText={props.firstNameErr}
        color="input"
        label="First name"
        value={props.firstName}
        onChange={handleFNChange}
        onBlur={(e) => {
          if (props.errors.firstNameBlured) {
            return;
          }
          props.firstNameValidate(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.submitButton();
          }
        }}
        sx={firstNameStyle}
        FormHelperTextProps={{
          sx: helperTextStyle,
        }}
      />
      <TextField
        size="small"
        helperText={props.lastNameErr}
        color="input"
        label="Last name"
        value={props.lastName}
        onChange={handleLNChange}
        onBlur={(e) => {
          if (props.errors.lastNameBlured) {
            return;
          }
          props.lastNameValidate(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.submitButton();
          }
        }}
        sx={lastNameStyle}
        FormHelperTextProps={{
          sx: {
            ...helperTextStyle,
          },
        }}
      />
    </Box>
  );
}

export default FirstLastName;
