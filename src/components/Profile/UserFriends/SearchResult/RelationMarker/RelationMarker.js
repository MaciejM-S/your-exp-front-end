import * as React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { theme } from "../../../../../theme";
function RelationMarker(props) {
  if (
    !props.friendsCollection.invitationsSent.find((item) => {
      return item._id === props.personId;
    }) &&
    !props.friendsCollection.friends.find((item) => {
      return item._id === props.personId;
    })
  ) {
    return (
      <>
        <Button sx={{width:'15%', minWidth:'100px'}}
          onClick={() => {
            props.handleSendInvitation(props.personId);
          }}
          variant="contained"
        >
          Send Invitation
        </Button>
      </>
    );
  } else if (
    props.friendsCollection.invitationsSent.find((item) => {
      return item._id === props.personId;
    })
  ) {
    return (
      <>
        <Typography
          sx={{
            textTransform: "uppercase",
            width:'15%', 
            minWidth:'100px',
            color: theme.palette.main_orange,
          }}
        >
          {" "}
          you already sent invitation
        </Typography>
      </>
    );
  } else if (
    props.friendsCollection.friends.find((item) => {
      return item._id === props.personId;
    })
  ) {
    return (
      <>
        <Typography
          sx={{
            textTransform: "uppercase",
            width: "150px",
            color: theme.palette.main_orange,
          }}
        >
          {" "}
          You are friends
        </Typography>
      </>
    );
  }
}

export default RelationMarker;
