import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MyTextField from "./MyTextField/MyTextField";
import FriendsList from "../../Friends/FriendsList/FriendsList";
import { baseUrl } from "../../..";
function UserFriends() {
  const [searchInquiry, setSearchInquiry] = React.useState("");
  const [helperText, setHelperText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [searchResult, setSearchResult] = React.useState();
  const [friendsCollection, setFriendsCollection] = React.useState();
  const [friends, setFriends] = React.useState();
  const [date, setDate] = React.useState();

  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios.get(baseUrl
      + "/friendsCollection", config).then((res) => {
      setFriendsCollection(res.data);
      axios
        .post(
          baseUrl
        + "/personsGenerator",
          res.data.friends,
          config
        )
        .then((response) => {
          setFriends(response.data);
          setLoading(false);
        });
    });
  }, []);

  const handleChange = (e) => {
    setSearchInquiry(e.target.value);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (searchInquiry === "") {
      setHelperText("you need to fill the field");
      return;
    }
    setHelperText("");
    setLoading(true);
    axios
      .post(baseUrl
        + "/findFriends", { searchInquiry }, config)
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
        navigate("/profile/userFriends/SearchResult");
      });
  };
  if (friendsCollection && friendsCollection.friends.length > 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "25px",
          marginTop: "15px",
        }}
      >
        <MyTextField
          helperText={helperText}
          handleKey={handleKey}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
        <Outlet context={[searchResult, friendsCollection, setDate]} />
        {!searchResult && <FriendsList friends={friends} />}
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "25px",
          marginTop: "15px",
        }}
      >
        <MyTextField
          helperText={helperText}
          handleChange={handleChange}
          handleSearch={handleSearch}
          handleKey={handleKey}
        />
        {!loading && friendsCollection && (
          <Typography
            variant="profileNoData"
            component="div"
            sx={{
              [theme.breakpoints.down("700")]: {
                fontSize: "15px",
              },
            }}
          >
            You haven't added any friends.
            <br /> Use the search engine to find friends.
          </Typography>
        )}
        <Outlet context={[searchResult, friendsCollection, setDate]} />
      </Box>
    </>
  );
}

export default UserFriends;
