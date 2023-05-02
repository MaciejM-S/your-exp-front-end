import React from "react";
import Post from "./Post/Post";

function Posts(props) {
  const posts = props.userPosts && [...props.userPosts.posts];
  const userId = props.userPosts && props.userPosts._id;

  if (!posts) return <></>;

  return <> 
  {posts.map((post, index) => {
    return <Post key={`${userId} ${index}`} userId={userId} post={post.post} />;
  })}
  </>
}

export default Posts;
