import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { theme } from "../../../theme";

export default function PublicationsRange(props) {
  const [friends, setFriends] = React.useState(true);
  const [everybody, setEverybody] = React.useState(false);

  const handleFriends = (e) => {
    if (!e.target.checked) {
      return;
    } else {
      setFriends(true);
      setEverybody(false);
      props.setRange("friends");
    }
  };

  const handleEverybody = (e) => {
    if (!e.target.checked) {
      return;
    } else {
      setFriends(false);
      setEverybody(true);
      props.setRange("everybody");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{
          m: 1,
          [theme.breakpoints.down("450")]: {
            m: 1,
          },
        }}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Choose post range:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={friends}
                onChange={handleFriends}
                name="gilad"
              />
            }
            label="only my friends"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={everybody}
                onChange={handleEverybody}
                name="jason"
              />
            }
            label="all users of yE"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
