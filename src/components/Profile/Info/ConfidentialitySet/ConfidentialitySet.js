import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import RestrictInfo from "./RestrictInfo/RestrictInfo";
import RestrictImages from "./RestrictImages/RestrictImages";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const mainBoxStyle = {
  display: "flex",
  margin: "15px auto",
  padding: "3px 0",
};

function ConfidentialitySet(props) {
  return (
    <>
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "40px auto",
          p:4
        }}
      >
        <RestrictInfo />
        <RestrictImages />
        <ChangeEmail />
        <ChangePassword />
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            props.setConfidentialitySet(false);
          }}
          sx={{
            margin: "25px 0",
            color: "black",
            fontSize: "16px",
          }}
        >
          OK
          <CheckCircleOutlineIcon
            sx={{
              width: "16px",
              ml: "4px",
            }}
          />
        </Button>
      </Box>
    </>
  );
}

export default ConfidentialitySet;
