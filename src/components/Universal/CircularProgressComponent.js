import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { theme } from "../../theme";


function FacebookCircularProgress(props) {
  return (
    <Box
      sx={{
        width: "100%",

        margin: "50px auto",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme.palette.orange_main,
          animationDuration: "600ms",

          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function CircularProgressComponent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress />
    </Box>
  );
}
