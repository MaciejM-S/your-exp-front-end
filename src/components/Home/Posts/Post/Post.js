import * as React from "react";
import {
  Box,
  Button,
  Fab,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import addComment from "../../../../functions/addComment";
import axios from "axios";
import ImageList from "../../../Profile/UserPosts/PostsTypes/ImageList/ImageList";
import Comments from "../../../Profile/UserPosts/PostsTypes/Comments/Comments";
import HeartComponent from "../../../Profile/UserPosts/PostsTypes/ProfilePic/HeartComponent";
import ThumbComponent from "../../../Profile/UserPosts/PostsTypes/ProfilePic/ThumbComponent";
import { Context } from "../../../../App";
import { useContext } from "react";
import postStyle from "./postStyle";
import PostTopBar from "./PostTopBar";
import CommentsLabel from "./CommentsLabel";
import { baseUrl } from "../../../..";
const { commentBarStyle, commentFieldStyle, commentBoxStyle, leftIconStyle } =
  postStyle;
const reactionBoxStyle = { width: "33px", height: "20px" };

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [textField, setTextField] = React.useState("none");
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState();
  const [commentError, setCommentError] = React.useState();
  const [date, setDate] = React.useState();
  const [uploadingComment, setUploadingComment] = React.useState(false);
  const [thumb, setThumb] = React.useState(false);
  const [changingThumb, setChangingThumb] = React.useState(true);
  const [heart, setHeart] = React.useState(false);
  const [changingHeart, setChangingHeart] = React.useState(true);
  const context = useContext(Context);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios
      .post(
        baseUrl
        + "/getComments",
        { commentsId: props.post.commentsId },
        config
      )
      .then((res) => {
        setComments(res.data);
        res.data.hearts.length > 0 &&
        res.data.hearts.find((id) => {
          return id === context.id;
        })
          ? setHeart(true)
          : setHeart(false);
        res.data.thumbsup.find((id) => id === context.id)
          ? setThumb(true)
          : setThumb(false);
        setChangingThumb(false);
        setChangingHeart(false);
      });
  }, [date]);

  const handleAddComment = () => {
    addComment(
      comment,
      setCommentError,
      comments.commentsId,
      setUploadingComment,
      setComment,
      setDate
    );
  };
  const handleReaction = (reaction) => {
    reaction === "addHeart" && setChangingHeart(true);
    reaction === "addThumb" && setChangingThumb(true);
    axios
      .post(
        baseUrl
        + "/addReaction",
        { reaction, commentsId: comments.commentsId },
        config
      )
      .then(() => {
        setDate(new Date().getTime());
      });
  };

  return (
    <Box sx={{ margin: "0 auto", maxWidth: "800px" }}>
      <Card
        sx={{
          margin: "15px",
        }}
      >
        <PostTopBar post={props.post} userId={props.userId} />
        <Box sx={{ padding: "4px 6px" }}>
          {props.post.photos && <ImageList images={props.post.photos} />}
          {props.post.type === "post" && (
            <Box>
              <Typography sx={{ fontSize: "30px", mt: 2 }}>
                {props.post.title}{" "}
              </Typography>
              <Divider />
              <Typography sx={{ fontSize: "20px", mt: 2 }}>
                {props.post.description}{" "}
              </Typography>
            </Box>
          )}

          <CardActions disableSpacing>
            <Box sx={commentBarStyle}>
              <Box>
                <IconButton
                  aria-label="favorites"
                  disabled={changingHeart}
                  onClick={() => {
                    handleReaction("addHeart");
                  }}
                >
                  {changingHeart ? (
                    <Box sx={reactionBoxStyle}>
                      <CircularProgress
                        thickness={4}
                        size={20}
                        sx={{ animationDuration: "900ms" }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ ...reactionBoxStyle, display: "flex" }}>
                      <HeartComponent
                        heart={heart}
                        handleReaction={handleReaction}
                        comments={comments}
                      />
                    </Box>
                  )}
                </IconButton>
                <IconButton
                  disabled={changingThumb}
                  onClick={() => {
                    handleReaction("addThumb");
                  }}
                  aria-label="thumb up"
                >
                  {changingThumb ? (
                    <Box sx={reactionBoxStyle}>
                      <CircularProgress
                        thickness={4}
                        size={23}
                        sx={{ animationDuration: "900ms" }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ ...reactionBoxStyle, display: "flex" }}>
                      <ThumbComponent
                        thumb={thumb}
                        handleReaction={handleReaction}
                        comments={comments}
                      />
                    </Box>
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    textField === "none" && setTextField("flex");
                  }}
                >
                  <AddCommentIcon />
                </IconButton>
              </Box>
              <Box sx={{ ...commentBoxStyle, display: textField }}>
                <ChevronLeftIcon
                  sx={leftIconStyle}
                  onClick={() => {
                    setTextField("none");
                  }}
                />
                <TextField
                  id="filled-basic"
                  autoFocus={true}
                  multiline={true}
                  sx={commentFieldStyle}
                  variant="standard"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder={commentError ? commentError : "input comment"}
                />

                {uploadingComment ? (
                  <CircularProgress sx={{ width: "15px", ml: 2 }} />
                ) : (
                  <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setUploadingComment(true);
                      handleAddComment();
                    }}
                  >
                    <AddIcon />
                  </Fab>
                )}
              </Box>

              <CommentsLabel
                handleExpandClick={handleExpandClick}
                comments={comments}
                expanded={expanded}
              />
            </Box>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                position: "relative",
                paddingBottom: "125px",
              }}
            >
              <Divider />
              {!(
                comments &&
                comments.comments &&
                comments.comments.length > 0
              ) ? (
                <Typography
                  sx={{
                    p: 4,
                    fontSize: "15px",
                  }}
                >
                  NO COMMENTS
                </Typography>
              ) : (
                <Comments comments={comments} />
              )}
              <Button
                variant="contained"
                onClick={() => {
                  textField === "none" && setTextField("flex");
                }}
                sx={{
                  width: "150px",
                  fontSize: "12px",
                }}
              >
                add comment
                <AddCircleOutlineIcon sx={{ fontSize: "35px" }} />
              </Button>
            </CardContent>
          </Collapse>
        </Box>
      </Card>
    </Box>
  );
}
