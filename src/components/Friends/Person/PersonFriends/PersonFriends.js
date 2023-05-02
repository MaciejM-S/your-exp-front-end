import { useEffect, useState } from "react";
import * as React from "react";
import { Typography, Box, Avatar, Divider } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import noAvatar from "../../../../assets/noAvatar.png";
import { Buffer } from "buffer";
import CircularProgressComponent from "../../../Universal/CircularProgressComponent";
import RelationMarker from "../../../Profile/UserFriends/SearchResult/RelationMarker/RelationMarker";
import personFriendsStyle from "./personFriendsStyle";
import { baseUrl } from "../../../..";

const { mainBoxStyle, avatarStyle, dividerStyle, youFriendsStyle } =
  personFriendsStyle;

function PersonFriends() {
  const [friends, setFriends] = useState(1);
  const [innerDate, setInnerDate] = React.useState(false);
  const [friendsCollection, setFriendsCollection] = React.useState();
  const [userId, setUserId] = React.useState();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(baseUrl
        + "/friendsCollection", config)
      .then((result) => {
        setFriendsCollection(result.data);
      });
    axios.get(baseUrl
      + "/userId", config).then((result) => {
        setUserId(result.data);
      });
    axios
      .post(baseUrl
        + "/friendsCollectionById", { _id: id }, config)
      .then((res) => {
        axios
          .post(baseUrl
            + "/personsGenerator", res.data, config)
          .then((response) => {
            setFriends(response.data);
          });
      });
  }, [innerDate]);

  if (friends.length === 0) {
    return (
      <>
        <Typography variant="profileNoData">
          This user has no friends yet
        </Typography>
      </>
    );
  }
  const handleSendInvitation = (id) => {
    axios
      .post(baseUrl
        + "/sendInvitation", { id }, config)
      .then((result) => {
        if (result.data === "blocked") {
          return;
        }
        setInnerDate(new Date());
      });
  };
  if (friends === 1) {
    return <CircularProgressComponent />;
  }
  if (typeof friends === "object") {
    return (
      <>
        <Box sx={{ m: 1, p: 1, mt: 2 }}>
          {friends
            ? friends.map((result) => (
              <>
                <Box sx={mainBoxStyle}>
                  <Box>
                    <Avatar
                      alt={result.info.lastName}
                      src={
                        result.avatar.data
                          ? "data:image/jpeg;base64," +
                          Buffer.from(
                            result.avatar.data,
                            "binary"
                          ).toString("base64")
                          : noAvatar
                      }
                      sx={avatarStyle}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      margin: 4,
                      width: "200px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      {result.info.firstName} {result.info.lastName}
                    </Typography>
                    {result.info.residence && (
                      <Typography>
                        Lives in: {result.info.residence}
                      </Typography>
                    )}
                    {result.info.workplace && (
                      <Typography>
                        Works in: {result.info.workplace}
                      </Typography>
                    )}
                    {result.info.education && (
                      <Typography>
                        Education: {result.info.education}
                      </Typography>
                    )}
                  </Box>
                  {friendsCollection && result._id !== userId ? (
                    <RelationMarker
                      onClick={() => {
                        handleSendInvitation(result);
                      }}
                      handleSendInvitation={handleSendInvitation}
                      personId={result._id}
                      friendsCollection={friendsCollection}
                      setInnerDate={setInnerDate}
                    />
                  ) : (
                    <Typography sx={youFriendsStyle}>
                      You are friends
                    </Typography>
                  )}
                </Box>
                <Divider sx={dividerStyle} variant="middle" />
              </>
            ))
            : friends === 0 && <CircularProgressComponent />}
        </Box>
      </>
    );
  }
}

export default PersonFriends;
