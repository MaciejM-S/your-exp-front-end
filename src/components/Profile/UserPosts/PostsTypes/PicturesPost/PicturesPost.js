import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, CircularProgress } from "@mui/material";
import { theme } from "../../../../../theme";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Comments from "../Comments/Comments";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import addComment from "../../../../../functions/addComment";
import axios from "axios";
import ImageList from "../ImageList/ImageList";
import HeartComponent from "../ProfilePic/HeartComponent";
import ThumbComponent from "../ProfilePic/ThumbComponent";
import CommentInput from "../ProfilePic/CommentInput";
import CommentsLabel from "../ProfilePic/CommentsLabel";
import picturePostStyle from "./picturePostStyle";
import TopBar from "./TopBar";
import { baseUrl } from "../../../../..";
const reactionBoxStyle = {width:'33px',height:'20px'}
const { commentsBarStyle } = picturePostStyle;
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

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
        baseUrl + '/getComments',
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
        baseUrl + '/addReaction',
        { reaction, commentsId: comments.commentsId },
        config
      )
      .then(() => {
        setDate(new Date().getTime());
      });
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ margin: "0 auto", maxWidth: "800px" }}>
      <Card
        sx={{
          margin: "15px",
          [theme.breakpoints.down("800")]: {
            margin: "10px 0",
          },
        }}
      >
        <TopBar
          open={open}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          setDeleteModal={setDeleteModal}
          post={props.post}
          deleteModal={deleteModal}
        />
        <Box sx={{ padding: "4px 6px" }}>
          <ImageList images={props.post.photos} />
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
