import * as React from "react";
import axios from "axios";
import { Typography, Fab } from "@mui/material";
import { Box } from "@mui/material";
import CircularProgressComponent from "../../../../components/Universal/CircularProgressComponent";
import PersonPost from "./PersonPost/PersonPost";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../..";

function PersonPosts() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [allPosts, setAllPosts] = React.useState();
  const [date, setDate] = React.useState();
  let { id } = useParams();

  React.useEffect(() => {
    setAllPosts();

    axios.get();
    axios.post(baseUrl
      + "/allPosts", { id }, config).then((res) => {
      const posts = res.data.posts.filter((post) => post.post.type === "post");

      const personPosts = posts.filter((post) => {
        return post.post.user_id === id;
      });

      setAllPosts(personPosts);
    });
  }, [date]);

  if (!allPosts) return <CircularProgressComponent />;

  return (
    <>
      <Box>
        {allPosts && allPosts.length > 0
          ? allPosts.map((post) => {
              if (post.post.type === "post")
                return <PersonPost post={post.post} setDate={setDate} />;
            })
          : allPosts &&
            allPosts.length === 0 && (
              <Typography variant="profileNoData">
                User has no posts yet
              </Typography>
            )}
      </Box>
    </>
  );
}

export default PersonPosts;
