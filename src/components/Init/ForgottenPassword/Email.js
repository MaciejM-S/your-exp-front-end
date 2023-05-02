import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { theme } from "../../../theme";
import forgottenPasswordStyle from "./forgottenPasswordStyle";

const { rowBoxStyle, iconFirstRow } = forgottenPasswordStyle;

function Email(props) {
  function handleKey (e){
  if (props.loading) return;
  if (e.key === "Enter") {
    e.preventDefault();
    props.handleSubmit();
  }
}
const handleChange = (e) => {
    props.setEmailErr(" ");
    props.setEmail(e.target.value.trim().toLowerCase());
  };

  return (
    <Box component="form" sx={rowBoxStyle}>
      <Box sx={iconFirstRow} aria-label="menu">
        <MailOutlineIcon sx={{ fontSize: "30px" }} />
      </Box>
      <TextField
        size="small"
        helperText={props.emailErr}
        color="input"
        label="Email"
        value={props.email}
        onKeyDown={handleKey}
        FormHelperTextProps={{
          sx: {
            color: theme.palette.button_orange,
          },
        }}
        onChange={handleChange}
        sx={{
          width: "330px",
          [theme.breakpoints.down("md")]: {
            width: "200px",
          },
        }}
      />
    </Box>
  );
}

export default Email;
