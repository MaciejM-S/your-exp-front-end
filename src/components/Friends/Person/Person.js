import { useParams } from "react-router-dom";
import React from "react";
import {
  Paper,
  Box,
  Tab,
  Tabs,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";
import { theme } from "../../../theme";
import BlockModal from "./Modals/BlockModal";
import RelationMarker from "./RelationMarker";
import RemoveModal from "./Modals/RemoveModal";
import { Context } from "../../../App";
import { ThemeProvider } from "@mui/material/styles";
import noAvatar from "../../../assets/noAvatar.png";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PersonInfoPanel from "./PersonInfoPanel";
import { Buffer } from "buffer";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useNavigate } from "react-router-dom";
import personStyle from "./personStyle";
import { baseUrl } from "../../..";

const {
  tabStyle,
  mainBoxStyle,
  profilePaperStyle,
  blockButtonStyle,
  dividerStyle,
  buttonGroupStyle,
  removeButtonStyle,
  buttonBoxStyle,
} = personStyle;

function Person() {
  const id = useParams();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [person, setPerson] = React.useState({ _id: id.id, profilePic: {} });
  const [date, setDate] = React.useState();
  const [openBlock, setOpenBlock] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const navigate = useNavigate();
  const [friendsCollection, setFriendsCollection] = React.useState();
  const context = React.useContext(Context);
  const idToSend = id.id;
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    window.location.pathname.split("/")[3] === "PersonPictures" && setValue(0);
    window.location.pathname.split("/")[3] === "PersonFriends" && setValue(1);
    window.location.pathname.split("/")[3] === "PersonPosts" && setValue(2);
  });
  React.useEffect(() => {
    axios
      .post(baseUrl
        + "/personProfile", { id }, config)
      .then((response) => {
        setPerson(response.data);
      });
    axios
      .get(baseUrl
        + "/friendsCollection", config)
      .then((result) => {
        setFriendsCollection(result.data);
      });
  }, [date, context.mainDate]);
  const handleSendInvitation = (id) => {
    axios
      .post(baseUrl
        + "/sendInvitation", { id: idToSend }, config)
      .then((result) => {
        if (result.data === "blocked") {
          return 
        }
        setLoading(false);
        setDate(new Date().getTime().toString());
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenBlock = () => setOpenBlock(true);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleBlock = (_id) => {
    axios
      .post(baseUrl
        + "/blockPerson", { _id }, config)
      .then(() => {
        axios
          .post(baseUrl
            + "/dismissInvitation", { _id }, config)
          .then(() => {
            setDate(new Date());
          });
      });
  };
  const handleRemove = (_id) => {
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
  React.useEffect(() => {
    window.location.pathname.split("/")[3] === "PersonPictures" && setValue(0);
    window.location.pathname.split("/")[3] === "PersonFriends" && setValue(1);
    window.location.pathname.split("/")[3] === "PersonPosts" && setValue(2);
  });
  React.useEffect(() => {
    axios
      .post(baseUrl
        + "/personProfile", { id }, config)
      .then((response) => {
        setPerson(response.data);
      });
    axios
      .get(baseUrl
        + "/friendsCollection", config)
      .then((result) => {
        setFriendsCollection(result.data);
      });
  }, [date, context.mainDate]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={mainBoxStyle}>
          <Paper elevation={3} sx={profilePaperStyle}>
            <>
              <img
                src={
                  Object.keys(person.profilePic).length > 0
                    ? "data:image/jpeg;base64," +
                      Buffer.from(
                        person.profilePic.data.data,
                        "binary"
                      ).toString("base64")
                    : noAvatar
                }
                style={{ height: "100%", width: "100%" }}
                alt=""
              />
            </>
          </Paper>
          <Box
            sx={{
              padding: "45px 45px",
              [theme.breakpoints.down(1200)]: {
                padding: "0",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {person.info && <PersonInfoPanel person={person} />}
            </Box>
            <Box sx={buttonBoxStyle}>
              {friendsCollection && (
                <RelationMarker
                  handleSendInvitation={handleSendInvitation}
                  personId={id}
                  friendsCollection={friendsCollection}
                  setInnerDate={setDate}
                  setLoading={setLoading}
                  loading={loading}
                />
              )}
              <ButtonGroup
                aria-label="vertical contained button group"
                variant="text"
                color="secondary"
                sx={buttonGroupStyle}
              >
                <Button
                  variant="contained"
                  onClick={handleOpenRemove}
                  sx={removeButtonStyle}
                  disabled={
                    friendsCollection !== undefined &&
                    !friendsCollection.friends.find(
                      (friend) => friend._id === person._id
                    )
                  }
                >
                  Remove from friends
                  <HighlightOffIcon sx={{ marginLeft: "10px" }} />
                </Button>

                <Button
                  onClick={handleOpenBlock}
                  variant="contained"
                  disabled={
                    friendsCollection !== undefined &&
                    friendsCollection.blocked.find(
                      (friend) => friend._id === person._id
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
                setOpen={setOpenBlock}
                handleBlock={handleBlock}
                _id={person._id}
              />
              <RemoveModal
                open={openRemove}
                setOpen={setOpenRemove}
                handleRemove={handleRemove}
                _id={person._id}
              />
            </Box>
          </Box>
        </Box>
        <Divider variant="middle" sx={dividerStyle} />
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={window.innerWidth < 600}
            allowScrollButtonsMobile
            sx={{
              fontSize: "35px",
              marginTop: "15px",
            }}
          >
            <Tab
              label="Pictures"
              onClick={() => {
                navigate(`/friends/${person._id}/PersonPictures`);
              }}
              sx={{ ...tabStyle, ml: "auto" }}
            />
            <Tab
              label="Friends"
              onClick={() => {
                navigate(`/friends/${person._id}/PersonFriends`);
              }}
              sx={tabStyle}
            />
            <Tab
              label="Posts"
              onClick={() => {
                navigate(`/friends/${person._id}/PersonPosts`);
              }}
              sx={{ ...tabStyle, mr: "auto" }}
            />
          </Tabs>
        </Box>
        <Outlet context={[id]} />
      </ThemeProvider>
    </>
  );
}

export default Person;
