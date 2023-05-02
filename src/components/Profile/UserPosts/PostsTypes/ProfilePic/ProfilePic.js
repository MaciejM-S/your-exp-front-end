import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CommentInput from "./CommentInput";
import { Box, Button, Divider, CircularProgress } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Buffer } from "buffer";
import Comments from "../Comments/Comments";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import addComment from "../../../../../functions/addComment";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import profilePicStyle from "./profilePicStyle";
import HeartComponent from "./HeartComponent";
import ThumbComponent from "./ThumbComponent";
import TopBar from "./TopBar";
import CommentsLabel from "./CommentsLabel";
import { baseUrl } from "../../../../..";

const { mainCardStyle, commentsBoxStyle } = profilePicStyle;

export default function ProfilePic(props) {
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const reactionBoxStyle = {width:'33px',height:'20px'}

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios
      .post(
        baseUrl + "/getComments",
        { commentsId: props.post.commentsId },
        config
      )
      .then((res) => {
        setComments(res.data);
        res.data.hearts.find((id) => id === props.post.user_id)
          ? setHeart(true)
          : setHeart(false);
        res.data.thumbsup.find((id) => id === props.post.user_id)
          ? setThumb(true)
          : setThumb(false);
        setChangingThumb(false);
        setChangingHeart(false);
      });
  }, [date]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
        baseUrl + "/addReaction",
        { reaction, commentsId: comments.commentsId },
        config
      )
      .then(() => {
        reaction === "addHeart" && setChangingHeart(false);
        reaction === "addHeart" && setHeart(!heart);
        reaction === "addThumb" && setChangingThumb(false);
        reaction === "addThumb" && setThumb(!thumb);
        setDate(new Date().getTime());
      });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteModal, setDeleteModal] = React.useState(false);

  return (
    <Box sx={{ margin: "0 auto", maxWidth: "800px" }}>
      <Card sx={mainCardStyle}>
        <TopBar
          open={open}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          setDeleteModal={setDeleteModal}
          post={props.post}
        />
        <DeleteModal
          open={deleteModal}
          setDeleteModal={setDeleteModal}
          commentsId={props.post.commentsId}
          setDate={props.setDate}
        />
        <Box sx={{ padding: "4px 6px" }}>
          <CardMedia
            component="img"
            sx={{
              height: "auto",
            }}
            image={
              "data:image/jpeg;base64," +
              Buffer.from(props.post.photos[0].data, "binary").toString(
                "base64"
              )
            }
            alt="Profile Pic"
          />
          <CardActions disableSpacing>
            <Box sx={commentsBoxStyle}>
              <Box>
                <IconButton aria-label="favorites"
                disabled={changingHeart}
                onClick={() => {
                  handleReaction("addHeart");
                }}
                >
                  {changingHeart ? (
                    <Box sx={reactionBoxStyle} >
                    <CircularProgress
                      thickness={4}
                      size={30}
                      sx={{ animationDuration: "900ms" }}
                    />
                    </Box>
                  ) : (
                    <Box sx={{...reactionBoxStyle, display:'flex'}} >
                    <HeartComponent
                      heart={heart}
                      handleReaction={handleReaction}
                      comments={comments}
                    />
                    </Box>
                  )}
                </IconButton>
                <IconButton aria-label="thumb up"
                disabled={changingThumb}
                onClick={() => {
                  handleReaction("addThumb");
                }}
                >
                  {changingThumb ? (
                   <Box sx={reactionBoxStyle} >
                     <CircularProgress
                      thickness={4}
                      size={30}
                      sx={{ animationDuration: "900ms" }}
                    />
                   </Box>
                  
                  ) : (
                    <Box sx={{...reactionBoxStyle, display:'flex'}} >
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
              <CommentsLabel
                comments={comments}
                handleExpandClick={handleExpandClick}
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
