import * as React from "react";
import { Typography, Box, Avatar, Divider, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noAvatar from "../../../assets/noAvatar.png";
import { Buffer } from "buffer";
import CircularProgressComponent from "../../Universal/CircularProgressComponent";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";
import { CircularProgress } from "@mui/material";
import { theme } from "../../../theme";
import blockedStyle from "./blockedStyle";
import { baseUrl } from "../../..";
const { mainBoxStyle, avatarStyle, infoStyle, dividerStyle } = blockedStyle;

function Blocked() {
  const [date, setDate] = React.useState();
  const [blocked, setBlocked] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  React.useEffect(() => {
    axios
      .get(baseUrl + "/friendsCollection", config)
      .then((response) => {
        axios
          .post(baseUrl + 
            "/personsGenerator",
            response.data.blocked,
            config
          )
          .then((response) => {
            setBlocked(response.data);
            setLoading(false);
          });
      });
  }, [date]);

  const handleClick = (id) => {
    navigate(`/friends/${id.toString()}/PersonPictures`);
  };

  const handleStopBlocking = (_id) => {
    axios
      .post(baseUrl + "/stopBlocking", { _id }, config)
      .then(() => {
        setDate(new Date().getTime().toString());

        setLoading(-1);
      });
  };

  if (blocked.length === 0) {
    return (
      <>
        <Typography variant="friendsTitle">
          You are not blocking any person.
        </Typography>
      </>
    );
  }

  return (
    <>
      <Box>
        <Typography variant="friendsTitle">
          You are blocking following people:
        </Typography>

        {blocked
          ? blocked.map((result, index) => (
              <>
                <Box sx={mainBoxStyle}>
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
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      disabled={loading === index || loading === -1}
                      variant="contained"
                      sx={{
                        minWidth: "150px",
                        [theme.breakpoints.down(600)]: {
                          width: "100px",
                          mt: 2,
                        },
                      }}
                      onClick={() => {
                        setLoading(index);
                        handleStopBlocking(result._id);
                      }}
                    >
                      Stop Blocking
                      {loading === index ? (
                        <CircularProgress
                          size={20}
                          sx={{ color: "white", ml: 1 }}
                        />
                      ) : (
                        <DoDisturbOffIcon sx={{ marginLeft: "10px" }} />
                      )}
                    </Button>
                  </Box>
                </Box>
                <Divider sx={dividerStyle} variant="middle" />
              </>
            ))
          : blocked === 0 && <CircularProgressComponent />}
      </Box>
    </>
  );
}

export default Blocked;
