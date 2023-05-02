import * as React from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import ProfilePic from "./PostsTypes/ProfilePic/ProfilePic";
import PicturesPost from "./PostsTypes/PicturesPost/PicturesPost";
import CircularProgressComponent from "../../../components/Universal/CircularProgressComponent";
import { theme } from "../../../theme";
import {Context} from '../../../App'
import { baseUrl } from "../../..";

function UserPosts() {
  const [userPosts, setUserPosts] = React.useState();
  const [date, setDate] = React.useState();
  const controller = new AbortController();
  const rendered = React.useRef(false);
  const context = React.useContext(Context);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    signal: controller.signal,
  };

  React.useEffect(() => {
    setUserPosts();
    axios
      .get(baseUrl
        + "/userPosts", config)
      .catch((e) => {})
      .then((res) => {
        setUserPosts(res.data);
      })
      .catch((e) => {});

    return () => {
      if (rendered.current) {
        return controller.abort();
      } else {
        rendered.current = true;
      }
    };
  }, [date, context.postAdded]);

  if (!userPosts) return <CircularProgressComponent />;
  return (
    <>
      <Box
        sx={{
          m: 5,
          [theme.breakpoints.down("800")]: {
            m: 1,
          },
        }}
      >
        {userPosts && userPosts.length > 0
          ? userPosts.map((post, index) => {
              if (post.post.type === "profilePic")
                return <ProfilePic key={index} post={post.post} setDate={setDate} />;
              else if (
                post.post.type === "pictures" ||
                post.post.type === "post"
              )
                return <PicturesPost  key={index} post={post.post} setDate={setDate} />;
            })
          : userPosts &&
            userPosts.length === 0 && (
              <Typography variant="profileNoData">
                You have no posts yet
              </Typography>
            )}
      </Box>
    </>
  );
}

export default UserPosts;
