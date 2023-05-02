import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { theme } from "../../../theme";
import { useRef } from "react";
import { Divider } from "@mui/material";
import userInfoStyle from "./userInfoStyle";

const {
  mainBoxStyle,
  textFieldStyle,
  featureStyle,
  editModeIconStyle,
  valueStyle,
  addIconStyle,
  featureTypography,
} = userInfoStyle;

function UsersInfo(props) {
  const handleChange = (e) => {
    props.validateInfo(e.target.value, props.feature);
    props.setValue({ ...props.value, [props.feature]: e.target.value });
  };

  const handleEdit = () => {
    props.setFocus(props.feature);
    props.setEdit(true);
  };

  const input = useRef(null);
  const marginTop = props.setHight ? "15px" : "0px";
  const translateY = props.setHight ? "70%" : "10%";
  const txtValue = props.value && props.value[props.feature];
  let feature = "tes";

  if (props.feature === "firstName") {
    feature = "first name";
  } else if (props.feature === "lastName") {
    feature = "last name";
  } else {
    feature = props.feature;
  }
  if (props.edit) {
    return (
      <Box sx={mainBoxStyle}>
        <Typography sx={featureTypography}>{feature}:</Typography>
        <TextField
          id="outlined-helperText"
          value={txtValue}
          size="small"
          autoFocus={props.focus}
          ref={input}
          helperText={props.errors[props.feature]}
          inputProps={{
            style: { fontSize: 18 },
          }}
          onChange={handleChange}
          FormHelperTextProps={{
            sx: {
              fontSize: "12px",
              color: theme.palette.main_orange,
              marginTop: "0px",
            },
          }}
          sx={{ ...textFieldStyle, marginTop: marginTop }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "55%",
            display: "flex",
          }}
        ></Box>
      </Box>
    );
  }

  return (
    <>
      <Box sx={mainBoxStyle}>
        <Typography sx={featureStyle}>{feature}:</Typography>
        <Box sx={valueStyle}>
          <Typography
            pl={2}
            sx={{
              width: "150px",
              fontSize: 22,
              [theme.breakpoints.down(600)]: {
                width: "100px",
              },
            }}
          >
            {props.value && props.value[props.feature]}
          </Typography>
          {txtValue ? (
            <ModeEditOutlineRoundedIcon
              onClick={handleEdit}
              sx={editModeIconStyle}
            />
          ) : (
            <AddCircleOutlineRoundedIcon
              onClick={() => {
                props.setFocus(props.feature);
                props.setEdit(true);
              }}
              sx={{ ...addIconStyle, transform: `translateY(${translateY})` }}
            />
          )}
        </Box>
      </Box>
      <Divider sx={{}} variant="middle" />
    </>
  );
}
export default UsersInfo;
