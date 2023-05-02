import React, { useContext } from "react";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/private-theming";
import {
  Box,
  Tab,
  Tabs,
  Divider,
  Paper,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { Context } from "../../App";
import userFeedStyle from "./userFeedStyle";
import AddProfile from "../Profile/Pictures/AddProfilePic";
import AddPost from "../Universal/AddPost/AddPost";
import AddPictures from "../Universal/AddPictures";
import Skeleton from "@mui/material/Skeleton";
import ProfilePic from "./ProfilePic";
import UserFeedInfo from "./UserFeedInfo";
import { baseUrl } from "../..";

const {
  mainBoxStyle,
  picturesBoxStyle,
  tabStyle,
  tabsStyle,
  profilePaperStyle
} = userFeedStyle;


function UserFeed() {
  const context = useContext(Context);
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);
  const [myTime, setMyTime] = React.useState();
  const [openAdd, setOpenAdd] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [openAddPictures, setOpenAddPictures] = React.useState(false);
  const [AddProf, setAddProf] = React.useState(false);
  let navigate = useNavigate();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    context.setMainMenuValue(2);
    if (!context.authenticated) {
      return navigate("/");
    } else {
      handleData();
    }
  }, [avatar, myTime, context.profilePic]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleData = () => {
    axios.get(baseUrl
      + "/info", config).then((response) => {
      setUser(response.data.user);
      setLoading(false);
    });
    axios.get(baseUrl
      + "/profilePic", config).then((response) => {
      if (response.data.data) {
        context.setProfilePic(
          Buffer.from(response.data.data, "binary").toString("base64")
        );
        context.setProfilePicDate(response.data.date);
        const avatar = context.avatar;
        avatar &&
          avatar.avatar &&
          context.setAvatar({
            ...avatar,
            avatar: {
              ...avatar.avatar,
              data: response.data.data,
            },
          });
      }
    });
  };

  const openAddProf = () => {
    setAddProf(true);
  };
  const closeAddProf = () => {
    setAddProf(false);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseAddPictures = () => {
    setOpenAddPictures(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={ mainBoxStyle }>
        <Paper sx={profilePaperStyle}>
          {loading ? (
            <Skeleton variant="rectangular" width={250} height={300} />
          ) : (
            <ProfilePic openAddProf={openAddProf} />
          )}
        </Paper>
       <UserFeedInfo
       user={user}
       setOpenAdd={setOpenAdd}
       setOpenAddPictures={setOpenAddPictures}
       />
      </Box>
      <Divider variant="middle" />
      <Box>
        <Box>
          <Tabs
            variant="scrollable"
            scrollButtons={window.innerWidth < 600}
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            sx={tabsStyle}
          >
            <Tab
              label="Users Info"
              sx={{ ...tabStyle, ml: "auto" }}
              onClick={() => {
                navigate("/profile/info");
              }}
            />
            <Tab
              label="Pictures"
              onClick={() => {
                navigate("/profile/pictures");
              }}
              sx={tabStyle}
            />
            <Tab
              label="Friends"
              onClick={() => {
                navigate("/profile/userFriends");
              }}
              sx={tabStyle}
            />
            <Tab
              label="Your Posts"
              onClick={() => {
                navigate("/profile/posts");
              }}
              sx={{ ...tabStyle, mr: "auto" }}
            />
          </Tabs>
        </Box>
        <AddProfile
          open={AddProf}
          handleClose={closeAddProf}
          setMyTime={setMyTime}
          setAvatar={setAvatar}
        />
        <AddPost open={openAdd} handleClose={handleCloseAdd} />
        <AddPictures
          open={openAddPictures}
          handleClose={handleCloseAddPictures}
          setMyTime={setMyTime}
        />
        <Outlet context={[setMyTime]} />
      </Box>
    </ThemeProvider>
  );
}

export default UserFeed;
