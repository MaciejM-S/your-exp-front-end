import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import registerMenuStyle from "./registerMenuStyle";

const { rowBoxStyle, helperTextStyle, iconStyle, emailStyle } =
  registerMenuStyle;

function Email(props) {
  const handleChange = (e) => {
    e.preventDefault();
    props.setEmail(e.target.value.toLowerCase());
    if (!props.errors.emailBlured) {
      return;
    }
    props.emailValidate(e.target.value);
  };

  const handleBlur = (e) => {
    if (props.errors.emaileBlured) {
      return;
    }
    props.emailValidate(e.target.value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.submitButton();
    }
  };
  return (
    <Box component="form" sx={rowBoxStyle}>
      <Box sx={iconStyle} aria-label="menu">
        <MailOutlineIcon sx={{ fontSize: "30px" }} />
      </Box>
      <TextField
        value={props.email}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKey}
        size="small"
        helperText={props.emailErr}
        FormHelperTextProps={{
          sx: helperTextStyle,
        }}
        color="input"
        label="Email"
        sx={emailStyle}
      />
    </Box>
  );
}

export default Email;
