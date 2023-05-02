import * as React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import noAvatar from "../../../../assets/noAvatar.png";
import axios from "axios";
import RelationMarker from "./RelationMarker/RelationMarker";
import BlockedAlert from "./BlockedAlert/BlockedAlert";
import CircularProgress from "@mui/material/CircularProgress";
import { theme } from "../../../../theme";
import { baseUrl } from "../../../..";
const mainBoxStyle = {
  mt: 2,
  display: "flex",
  width: "calc(20% + 400px)",
  justifyContent: "space-between",
  color: "white",
  alignItems: "center",
  [theme.breakpoints.down("750")]: {
    flexDirection: "column",
    width: "250px",
  },
};
const avatarStyle = {
  width: "150px",
  height: "150px",
  margin: "15px 0",
  background:
    "radial-gradient(circle, rgba(142,118,118,1) 8%, rgba(59,53,51,1) 97%)",
};

function SearchResult() {
  let [searchResult] = useOutletContext();
  const navigate = useNavigate();
  const [innerDate, setInnerDate] = React.useState(false);
  const [alert, setAlert] = React.useState("none");
  const [friendsCollection, setFriendsCollection] = React.useState();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get(baseUrl
        + "/friendsCollection", config)
      .then((result) => {
        setFriendsCollection(result.data);
      });
  }, [innerDate]);

  const handleSendInvitation = (id) => {
    axios
      .post(baseUrl
        + "/sendInvitation", { id }, config)
      .then((result) => {
        if (result.data === "blocked") {
          return setAlert("block");
        }
        setInnerDate(new Date());
      });
  };
  const handleClick = (id) => {
    navigate(`/friends/${id.toString()}/PersonPictures`);
  };
  if (searchResult && searchResult.length === 0) {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
    return (
      <>
        <Typography
          variant="h4"
          component="div"
          sx={{
            color: "#DDDDDD",
            marginTop: "30px",
          }}
        >
          No Search Result
        </Typography>
      </>
    );
  }
  return (
    <>
      {searchResult &&
        searchResult.map((result) => (
          <>
            <Box sx={mainBoxStyle}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(result._id);
                }}
              >
                <Avatar
                  alt={result.lastName}
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
                sx={{
                  textAlign: "center",
                  margin: 4,
                  cursor: "pointer",
                }}
              >
                <Typography sx={{ fontWeight: "500", m: "2px 0" }}>
                  {result.firstName} {result.lastName}
                </Typography>
                {result.residence && (
                  <Typography sx={{ m: "2px 0" }}>
                    Lives in: {result.residence}
                  </Typography>
                )}
                {result.workplace && (
                  <Typography sx={{ m: "2px 0" }}>
                    Works in: {result.workplace}
                  </Typography>
                )}
                {result.education && (
                  <Typography sx={{ m: "2px 0" }}>
                    Education: {result.education}
                  </Typography>
                )}
              </Box>
              <Box>
                {friendsCollection ? (
                  <RelationMarker
                    onClick={() => {
                      handleSendInvitation(result._id);
                    }}
                    handleSendInvitation={handleSendInvitation}
                    personId={result._id}
                    friendsCollection={friendsCollection}
                    setInnerDate={setInnerDate}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Box>
            </Box>
            <Divider
              sx={{
                color: "white",
                width: "50%",
                minWidth: "200px",
                marginTop: "25px",
              }}
              variant="middle"
            />
          </>
        ))}
      <BlockedAlert alert={alert} setAlert={setAlert} />
    </>
  );
}

export default SearchResult;
