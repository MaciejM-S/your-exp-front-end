import * as React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { theme } from "../../../theme";
import CircularProgress from "@mui/material/CircularProgress";

const description = {
  textTransform: "uppercase",
  fontWeight: "500",
  border: "black solid 1px",
  padding: "4px 0",
  borderRadius: "4px",
  borderColor: theme.palette.main_orange,
  color: theme.palette.main_orange,
  marginBottom: "10px",
  [theme.breakpoints.down(400)]: {
    margin: "0px 10px",
  },
};

function RelationMarker(props) {
  if (
    !props.friendsCollection.invitationsSent.find((item) => {
      return item._id === props.personId.id;
    }) &&
    !props.friendsCollection.friends.find((item) => {
      return item._id === props.personId.id;
    })
  ) {
    return (
      <>
        <Button
          onClick={() => {
            props.setLoading(true);
            props.handleSendInvitation(props.personId);
          }}
          variant="contained"
          sx={{
            height: 40,
            marginBottom: "10px",
            border: "1px solid #999",
            [theme.breakpoints.down(400)]: {
              margin: "0 10px",
            },
          }}
        >
          Send Invitation
          {props.loading ? (
            <CircularProgress size={25} sx={{ ml: 1, color: "#DDD" }} />
          ) : (
            false
          )}
        </Button>
      </>
    );
  } else if (
    props.friendsCollection.invitationsSent.find((item) => {
      return item._id === props.personId.id;
    })
  ) {
    return (
      <>
        <Typography sx={description}>
          {" "}
          you have already sent an invitation
        </Typography>
      </>
    );
  } else if (
    props.friendsCollection.friends.find((item) => {
      return item._id === props.personId.id;
    })
  ) {
    return (
      <>
        <Typography sx={description}> You are friends</Typography>
      </>
    );
  }
}

export default RelationMarker;
