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
import errorHandler from "../../../functions/errorHandler";
import SendIcon from "@mui/icons-material/Send";
import { baseUrl } from "../../..";

function Suggestions() {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/friends/${id.toString()}/PersonPictures`);
  };

  const [date, setDate] = React.useState();
  const handleOpenBlock = () => setOpenBlock(true);
  const handleOpenRemove = () => setOpenRemove(true);

  const [openBlock, setOpenBlock] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [friends, setFriends] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(baseUrl
        + "/suggestions", config)
      .then((response) => {
        setFriends(response.data);
        setLoading(false);
      })
      .catch(e=>{
        errorHandler(e.response.status, navigate)
      });
  }, [date]);

  const [loading, setLoading] = React.useState(true);

  const handleSendInvitation = (id) => {
    setLoading(true);
    setFriends(0);
    axios
      .post(baseUrl
        + "/sendInvitation", { id }, config)
      .catch(e=>{})
      .then((result) => {
        setDate(new Date().getTime().toString());
      }).catch(e=>{})
  };

  return (
    <>
      <Box  >
        <Typography
           variant="friendsTitle"
        >
          People you may know or want to know:
        </Typography>

        {loading && <CircularProgressComponent />}

        {friends.length === 0 && (
          <>
            <Typography variant="h5" sx={{ color: "#DDD", mt:3, fontWeight:200 }} component="div">
              no suggestions at this moment
            </Typography>
          </>
        )}
  <Box sx={{margin:'20px 15px'}}>

  {friends
          ? friends.map((result, index) => (
              <
              div
              key={index}>
                <Box
                
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    color: "white",
                    alignItems: "center",
                    margin: "1% auto",
                    padding:"5px 0"
                  }}
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
                    sx={{
                      textAlign: "center",
                      margin: 4,
                      cursor: "pointer",
                      width: "10%",
                      minWidth: "200px",
                    }}
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
                      }}
                      onClick={() => {
                        handleSendInvitation(result._id.toString());
                      }}
                    >
                      send invitation
                      <SendIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                  </Box>
                </Box>
                <Divider
                  sx={{
                    color: "white",
                    width: "60%",
                    minWidth: "200px",
                    margin: "0 auto",
                  }}
                  variant="middle"
                />
              </div>
            ))
          : false}


  </Box>
        
      </Box>
    </>
  );
}

export default Suggestions;
