import { theme } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Box } from "@mui/material";
import AddPost from "../Universal/AddPost/AddPost";
import React from "react";
import Posts from "./Posts/Posts";
import axios from "axios";
import { Context } from "../../App";
import Contacts from "./Contacts/Contacts";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Skeleton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "../..";

const contactBoxStyle = {
  display: "none",
  width: "21%",
  right: "0",
  top: "80px",
  position: "fixed",
  [theme.breakpoints.up(1500)]: {
    display: "block",
    position: "fixed",
  },
};

const fabStyle = {
  position: "fixed",
  left: "10%",
  top: "95px",
  pr: 3,
  [theme.breakpoints.down("1500")]: { display: "none" },
};

const boxSkeletonStyle = {
  margin: "15px auto",
  maxWidth: "800px"
};

const skeletonStyle = {
  margin:'15px 15px 50px',
  height:'300px',
  borderRadius:'5px'
}

function HomeFeed() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [posts, setPosts] = React.useState({currentPage:1, posts:[], hasMore:true});
  const [date, setDate] = React.useState();
  const [loadingPosts, setLoadingPosts] = React.useState(true);
  const [friends, setFriends] = React.useState();
  const rendered = React.useRef(false);
  const context = React.useContext(Context);
  const navigate = useNavigate();
  const controller = new AbortController();

  const handleClose = () => {
    setOpenAdd(false);
  };
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    signal: controller.signal,
  };

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  React.useEffect(() => {
    context.authenticated ? handleData() : navigate("/");
    context.setMainMenuValue(0);

    return () => {
      if (rendered.current) {
        return controller.abort();
      } else {
        rendered.current = true;
      }
    };
  }, [date, context.mainDate]);

  const handleData = () => {
    setLoadingPosts(true);
    axios
      .post(
        baseUrl
        + "/allPosts",
        {
          id: context.id,
          currentPage: posts.currentPage,
        },
        config,
        source
      )
      .then((res) => {
        
        
        setPosts({
          currentPage:res.data.currentPage, 
          posts:posts.posts.concat(res.data.posts),
          hasMore:res.data.hasMore 
        })
        setLoadingPosts(false);
      })
      .catch((e) => {});

    axios.get(baseUrl
      + "/friendsCollection", config).then((res) => {
      axios
        .post(
          baseUrl
        + "/personsGenerator",
          res.data.friends,
          config
        )
        .catch((e) => {})
        .then((response) => {
          setFriends(response.data);
        })
        .catch((e) => {
          if(e.message!=="Cannot read properties of undefined (reading 'data')"){
             navigate('/error')
          }
         });
    });
  };

  const handleNextData = ()=>{
    axios
    .post(
      baseUrl
        + "/allPosts",
      {
        id: context.id,
        currentPage: posts.currentPage,
      },
      config,
      source
    )
    .then((res) => {
      setPosts({
        currentPage:res.data.currentPage, 
        posts:posts.posts.concat(res.data.posts),
        hasMore:res.data.hasMore 
      })
      setLoadingPosts(false);
    })
    .catch((e) => {});
  }

  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          minHeight: "40vh",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
          }}
        >
          {loadingPosts ? (
            <Box sx={{ marginTop: "20vh" }}>
              <CircularProgress size={75} />
            </Box>
          ) : (
            <InfiniteScroll
              dataLength={posts.posts.length || 0}
              next={handleNextData}
              hasMore={posts.hasMore}
              loader={
                <Box sx={boxSkeletonStyle} >
                  <Skeleton variant="rectangular" sx={skeletonStyle} />
                </Box>
              }
              refreshFunction={() => {
                return <h1>this is what has been returned</h1>;
              }}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
            >
              <Posts userPosts={posts} />
            </InfiniteScroll>
          )}
        </Box>
        <Box sx={contactBoxStyle}>
          <Contacts friends={friends} />
        </Box>
      </Box>
      <Fab
        sx={fabStyle}
        onClick={() => {
          setOpenAdd(true);
        }}
        variant="extended"
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ mr: 1 }} />
        post
      </Fab>
      <AddPost open={openAdd} handleClose={handleClose} setDate={setDate} />
    </>
  );
}

export default HomeFeed;
