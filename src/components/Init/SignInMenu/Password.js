import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { theme } from "../../../theme";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PasswordIcon from "@mui/icons-material/Password";
import signInMenuStyle from "./signInMenuStyle";

const { rowBoxStyle, iconSecondRow } = signInMenuStyle;

function Password(props) {
  const handleChange = (e) => {
    props.setPasswordErr(" ");
    props.setPassword(e.target.value.trim());
  };

  return (
    <Box component="form" sx={rowBoxStyle}>
      <Box sx={iconSecondRow} aria-label="menu">
        <PasswordIcon sx={{ fontSize: "30px" }} />
      </Box>

      <FormControl
        onKeyDown={(e) => {
          if (props.loading) return;
          if (e.key === "Enter") {
            e.preventDefault();
            props.handleSubmit();
          }
        }}
      >
        <InputLabel
          color="input"
          size="small"
          htmlFor="outlined-adornment-password"
        >
          Password
        </InputLabel>
        <OutlinedInput
          size="small"
          color="input"
          id="filled-adornment-password"
          label="Password"
          value={props.password}
          type={props.showPassword ? "text" : "password"}
          onChange={handleChange}
          sx={{
            width: "330px",
            [theme.breakpoints.down("md")]: {
              width: "200px",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => {
                  props.setShowPassword(!props.showPassword);
                }}
              >
                {props.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={{ color: theme.palette.button_orange }}>
          {props.passwordErr}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}

export default Password;
