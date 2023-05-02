import * as React from "react";
import {
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noAvatar from "../../../assets/noAvatar.png";
import { Buffer } from "buffer";
import CircularProgressComponent from "../../Universal/CircularProgressComponent";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import invitationsStyle from "./invitationsStyle"
import { baseUrl } from "../../..";

const { mainBoxStyle, dividerStyle,
  dissmisButtonStyle,
  infoBoxStyle } = invitationsStyle

function Invitations() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState();
  const [invitations, setInvitations] = React.useState(0);

  const handleClick = (id) => {
    navigate(`/friends/${id.toString()}/PersonPictures`);
  };
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  React.useEffect(() => {
    axios
      .get(baseUrl
        + "/friendsCollection", config)
      .then((response) => {
        axios
          .post(
            baseUrl
        + "/personsGenerator",
            response.data.invitationsRecieved,
            config
          )
          .then((response) => {
            setInvitations(response.data);
          });
      });
  }, [date]);

  const handleDismiss = (_id) => {
    setInvitations(0);
    axios
      .post(baseUrl
        + "/dismissInvitation", { _id }, config)
      .then(() => {
        setDate(new Date().getTime().toString());
      });
  };

  const handleAccept = (_id) => {
    setInvitations(0);
    axios
      .post(baseUrl
        + "/acceptInvitation", { _id }, config)
      .then((result) => {
        if (result.data === "accepted") {
          setDate(new Date().getTime().toString());
        }
      });
  };

  if (invitations && invitations.length === 0) {
    return (
      <>
        <Typography variant="friendsTitle">No new ivitations.</Typography>
      </>
    );
  }

  return (
    <>
      <Box>
        <Typography
          variant="friendsTitle"
          sx={{
            marginBottom: "25px",
          }}
        >
          The following people sent you a friend request:
        </Typography>
        {invitations
          ? invitations.map((result) => (
            <>
              <Box
                sx={mainBoxStyle}
              >
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClick(result._id);
                  }}
                >
                  <Avatar
                    alt={result.info.lastName}
                    src={
                      result.avatar.data
                        ? "data:image/jpeg" +
                        ";base64," +
                        Buffer.from(result.avatar.data, "binary").toString(
                          "base64"
                        )
                        : noAvatar
                    }
                    sx={{
                      width: "150px",
                      height: "150px",
                      background:
                        "radial-gradient(circle, rgba(142,118,118,1) 8%, rgba(59,53,51,1) 97%)",
                    }}
                  />
                </Box>

                <Box
                  onClick={() => {
                    handleClick(result._id);
                  }}
                  sx={infoBoxStyle}
                >
                  <Typography sx={{ fontWeight: "500" }}>
                    {result.info.firstName} {result.info.lastName}
                  </Typography>
                  {result.info.residence && (
                    <Typography>Lives in: {result.info.residence}</Typography>
                  )}
                  {result.info.workplace && (
                    <Typography>Works in: {result.info.workplace}</Typography>
                  )}
                  {result.info.education && (
                    <Typography>
                      Education: {result.info.education}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 2,
                  }}
                >
                  <ButtonGroup variant="text">
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "150px",
                        marginBottom: "15px",
                      }}
                      onClick={() => {
                        handleAccept(result._id);
                      }}
                    >
                      Accept
                      <PersonAddIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDismiss(result._id);
                      }}
                      sx={dissmisButtonStyle}
                    >
                      Dismiss
                      <HighlightOffIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Divider
                sx={dividerStyle}
                variant="middle"
              />
            </>
          ))
          : invitations === 0 && <CircularProgressComponent />}
      </Box>
    </>
  );
}

export default Invitations;
