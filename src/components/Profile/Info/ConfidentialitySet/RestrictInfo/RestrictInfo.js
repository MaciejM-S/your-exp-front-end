import React from "react";
import { theme } from "../../../../../theme";
import { Divider, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import axios from "axios";
import { baseUrl } from "../../../../..";
function RestrictInfo() {
  const [value, setValue] = React.useState("");
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  React.useEffect(() => {
    axios.get(baseUrl
      + "/restrictInfo", config).then((res) => {
      setValue(res.data);
    });
  }, []);

  const handleChange = (e) => {
    axios
      .post(
        baseUrl
        + "/restrictInfo",
        { value: e.currentTarget.checked },
        config
      )
      .then((res) => {
        setValue(res.data);
      });
  };

  return (
    <>
      <ListItem sx={{ marginTop: "15px" }}>
        <PersonOffIcon variant="confidential" />
        <Typography variant="confidentialityVariant">
          Restrict access of my personel info (residance, work place and
          education) to my friends only.
        </Typography>
        <Checkbox
          checked={value}
          onChange={(e) => {
            handleChange(e);
          }}
          sx={{
            position: "absolute",
            right: "0px",
          }}
          disableRipple
        />
      </ListItem>
      <Divider
        sx={{
          marginTop: "25px",
        }}
        variant="middle"
      />
    </>
  );
}

export default RestrictInfo;
