import React from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

function Contacts(props) {
  const navigate = useNavigate();

  if (props.friends)
    return (
      <>
        <Typography sx={{ textAlign: "left", ml: 1 }} variant="profileNoData">
          Contacts:
        </Typography>
        <Box>
          {props.friends.map((friend, index) => (
            <Box
              key={index}
              onClick={() => {
                navigate(`/friends/${friend._id}/PersonPictures`);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                m: 1,
                width: "250px",
              }}
            >
              <Avatar
                src={
                  friend.avatar &&
                  friend.avatar.data &&
                  "data:image/jpeg;base64," +
                    Buffer.from(friend.avatar.data, "binary").toString("base64")
                }
              />
              <Typography
                variant="confidentialityVariant"
                sx={{ color: "DDD", ml: 1 }}
              >
                {" "}
                {friend.info.firstName} {friend.info.lastName}
              </Typography>
            </Box>
          ))}
        </Box>
      </>
    );
}

export default Contacts;
