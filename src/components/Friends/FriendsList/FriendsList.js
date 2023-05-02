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
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BlockModal from "./Modals/BlockModal";
import RemoveModal from "./Modals/RemoveModal";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { theme } from "../../../theme";
import friendsListStyle from './friendsListStyle'
import { baseUrl } from "../../..";

const { mainBox,
  avatarStyle,
  infoStyle,
  buttonGroupStyle,
  removeButtonStyle,
  blockButtonStyle,
  dividerStyle } = friendsListStyle

function FriendsList() {
  const navigate = useNavigate();
  const [date, setDate] = React.useState();
  const [openBlock, setOpenBlock] = React.useState({
    open: false,
    modalNumber: null,
  });
  const [openRemove, setOpenRemove] = React.useState({
    open: false,
    modalNumber: null,
  });
  const [friends, setFriends] = React.useState(0);
  const [friendsCollection, setFriendsCollection] = React.useState();

  const handleClick = (id) => {
    navigate(`/friends/${id.toString()}/PersonPictures`);
  };
  const handleOpenBlock = (index) =>
    setOpenBlock({ open: true, modalNumber: index });
  const handleOpenRemove = (index) =>
    setOpenRemove({ open: true, modalNumber: index });

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
        setFriendsCollection(response.data);
        axios
          .post(
            baseUrl
            + "/personsGenerator",
            response.data.friends,
            config
          )
          .then((response) => {
            setFriends(response.data);
          });
      });
  }, [date]);

  const handleBlock = (_id) => {
    axios
      .post(baseUrl
        + "/blockPerson", { _id }, config)
      .then(() => {
        axios
          .post(baseUrl
            + "/dismissInvitation", { _id }, config)
          .then(() => {
            setDate(new Date().getTime().toString());
          });
      });
  };

  const handleRemove = (_id) => {
    setFriends(0);
    axios
      .post(baseUrl
        + "/removePerson", { _id }, config)
      .then((result) => {
        if (result.data !== "removed") {
          return;
        }
        setDate(new Date().getTime().toString());
      });
  };

  if (friends.length === 0) {
    return (
      <>
        <Typography variant="friendsTitle">
          You have no friends (yet).
        </Typography>
      </>
    );
  }

  return (
    <>
      <Box>
        <Typography variant="friendsTitle">Your friends:</Typography>

        {friends
          ? friends.map((result, index) => (
            <>
              <Box
                sx={mainBox}
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
                        ? "data:image/jpeg;base64," +
                        Buffer.from(result.avatar.data, "binary").toString(
                          "base64"
                        )
                        : noAvatar
                    }
                    sx={avatarStyle}
                  />
                </Box>
                <Box
                  onClick={() => {
                    handleClick(result._id);
                  }}
                  sx={infoStyle}
                >
                  <Typography sx={{ fontWeight: "500" }}>
                    {result.info.firstName} {result.info.lastName}
                  </Typography>
                  {result.info.residence ? (
                    <Typography>Lives in: {result.info.residence}</Typography>
                  ) : (
                    false
                  )}
                  {result.info.workplace ? (
                    <Typography>Works in: {result.info.workplace}</Typography>
                  ) : (
                    false
                  )}
                  {result.info.education ? (
                    <Typography>
                      Education: {result.info.education}
                    </Typography>
                  ) : (
                    false
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "15px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "150px",
                      marginBottom: "15px",
                      [theme.breakpoints.down(400)]: {
                        fontSize: "10px",
                      },
                    }}
                    onClick={() => {
                      navigate(`/friends/${result._id}/PersonFriends`);
                    }}
                  >
                    Open Profile
                    <AccountBoxIcon sx={{ marginLeft: "10px" }} />
                  </Button>
                  <ButtonGroup
                    aria-label="vertical contained button group"
                    variant="text"
                    color="secondary"
                    sx={buttonGroupStyle}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleOpenRemove(index);
                      }}
                      sx={removeButtonStyle}
                    >
                      Remove from friends
                      <HighlightOffIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                    <Button
                      onClick={() => {
                        handleOpenBlock(index);
                      }}
                      variant="contained"
                      disabled={
                        !!friendsCollection.blocked.find(
                          (blockedUser) => blockedUser._id === result._id
                        )
                      }
                      sx={blockButtonStyle}
                    >
                      Block
                      <NotInterestedIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                  </ButtonGroup>
                  <BlockModal
                    open={openBlock}
                    index={index}
                    setOpen={setOpenBlock}
                    handleBlock={handleBlock}
                    _id={result._id}
                  />
                  <RemoveModal
                    open={openRemove}
                    setOpen={setOpenRemove}
                    index={index}
                    handleRemove={handleRemove}
                    _id={result._id}
                  />
                </Box>
              </Box>
              <Divider
                sx={dividerStyle}
                variant="middle"
              />
            </>
          ))
          : friends === 0 && <CircularProgressComponent />}
      </Box>
    </>
  );
}

export default FriendsList;
