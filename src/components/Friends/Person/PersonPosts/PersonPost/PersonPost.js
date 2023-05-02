import * as React from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Badge,
  Button,
  Divider,
  CircularProgress,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { theme } from "../../../../../theme";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Comments from "../../../../Profile/UserPosts/PostsTypes/Comments/Comments";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import addComment from "../../../../../functions/addComment";
import axios from "axios";
import ImageList from "../../../../Profile/UserPosts/PostsTypes/ImageList/ImageList";
import { useContext } from "react";
import { Context } from "../../../../../App";
import ThumbComponent from "../../../../Profile/UserPosts/PostsTypes/ProfilePic/ThumbComponent";
import HeartComponent from "../../../../Profile/UserPosts/PostsTypes/ProfilePic/HeartComponent";
import personPostStyle from "./personPostStyle";
import PostTopBar from "./PostTopBar";
import CommentInput from "./CommentInput";
import { baseUrl } from "../../../../..";

const { commentsBarStyle } = personPostStyle;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PicturesPost(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [textField, setTextField] = React.useState("none");
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState();
  const [commentError, setCommentError] = React.useState();
  const [uploadingComment, setUploadingComment] = React.useState(false);
  const [date, setDate] = React.useState();
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
        res.data.hearts.find((id) => id === context.id)
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
        setDate(new Date().getTime().toString());
      });
  };

  return (
    <Box sx={{ margin: "0 auto", maxWidth: "800px" }}>
      <Card
        sx={{
          margin: "15px",
        }}
      >
        <PostTopBar post={props.post} />
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
            <Box sx={commentsBarStyle}>
              <Box>
                <IconButton aria-label="favorites"
                disabled={changingHeart}
                onClick={() => {
                  handleReaction("addHeart");
                }}
                
                >
                  {changingHeart ? (
                    <CircularProgress
                      thickness={4}
                      size={30}
                      sx={{ animationDuration: "900ms" }}
                    />
                  ) : (
                    <HeartComponent
                      heart={heart}
                      handleReaction={handleReaction}
                      comments={comments}
                    />
                  )}
                </IconButton>
                <IconButton 
                 disabled={changingThumb}
                 onClick={() => {
                   handleReaction("addThumb");
                 }}
                aria-label="thumb up">
                  {changingThumb ? (
                    <CircularProgress
                      thickness={4}
                      size={30}
                      sx={{ animationDuration: "900ms" }}
                    />
                  ) : (
                    <ThumbComponent
                      thumb={thumb}
                      handleReaction={handleReaction}
                      comments={comments}
                      
                    />
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
              <CommentInput
                textField={textField}
                setTextField={setTextField}
                comment={comment}
                setComment={setComment}
                commentError={commentError}
                uploadingComment={uploadingComment}
                setUploadingComment={setUploadingComment}
                handleAddComment={handleAddComment}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "700",
                    [theme.breakpoints.down(700)]: {
                      fontSize: "14px",
                    },
                  }}
                >
                  Comments:
                </Typography>
                <Badge
                  onClick={handleExpandClick}
                  sx={{ pl: 1, cursor: "pointer" }}
                  badgeContent={
                    comments && comments.comments && comments.comments.length
                  }
                  color="primary"
                >
                  <ChatBubbleIcon />
                </Badge>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon sx={{}} />
                </ExpandMore>
              </Box>
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
