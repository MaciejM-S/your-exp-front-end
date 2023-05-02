import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import PasswordIcon from "@mui/icons-material/Password";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { InputLabel } from "@mui/material";
import registerMenuStyle from "./registerMenuStyle";

const { rowBoxStyle, helperTextStyle, iconStyle, passwordStyle } =
  registerMenuStyle;

function Password(props) {
  
  
  const handleChange = (e) => {
    e.preventDefault();
    props.setPassword(e.target.value.trim());
    if (!props.errors.emailBlured) {
      return;
    }
    props.passwordValidate(e.target.value);
  };

  return (
    <Box component="form" sx={rowBoxStyle}>
      <Box sx={iconStyle} aria-label="menu">
        <PasswordIcon sx={{ fontSize: "30px" }} />
      </Box>
      <FormControl
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.submitButton();
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
          label="Password"
          value={props.password}
          type={props.showPassword ? "text" : "password"}
          onChange={handleChange}
          onBlur={(e) => {
            if (props.errors.emaileBlured) {
              return;
            }
            props.passwordValidate(e.target.value);
          }}
          FormHelperTextProps={{
            sx: helperTextStyle,
          }}
          helperText={props.passwordErr}
          sx={passwordStyle}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                sx={{ m: 0 }}
                onClick={() => {
                  props.setShowPassword(!props.showPassword);
                }}
              >
                {props.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={helperTextStyle}>
          {props.passwordErr}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}

export default Password;
