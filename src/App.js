import React from "react";
import axios from "axios";
import "./App.css";
import TopNav from "./components/TopNavComp/TopNav";
import MainFeed from "./components/Init/MainFeed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserFeed from "./components/Profile/UserFeed";
import Info from "./components/Profile/Info/Info";
import Pictures from "./components/Profile/Pictures/Pictures";
import UserFriends from "./components/Profile/UserFriends/UserFriends";
import SearchResult from "./components/Profile/UserFriends/SearchResult/SearchResult";
import Friends from "./components/Friends/Friends";
import Person from "./components/Friends/Person/Person";
import Suggestions from "./components/Friends/Suggestions/Suggestions";
import PersonPictures from "./components/Friends/Person/PersonPictures/PersonPictures";
import Invitations from "./components/Friends/Invitations/Invitations";
import Blocked from "./components/Friends/Blocked/Blocked";
import FriendsList from "./components/Friends/FriendsList/FriendsList";
import PersonFriends from "./components/Friends/Person/PersonFriends/PersonFriends";
import HomeFeed from "./components/Home/HomeFeed";
import UserPosts from "./components/Profile/UserPosts/UserPosts";
import PersonPosts from "./components/Friends/Person/PersonPosts/PersonPosts";
import Error from './components/Error/Error';
import NotFound from './components/Error/NotFound';
import { baseUrl } from ".";


export const Context = React.createContext();

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [avatar, setAvatar] = React.useState();
  const [mainDate, setMainDate] = React.useState();
  const [id, setId] = React.useState();
  const [mainMenuValue, setMainMenuValue] = React.useState(1);
  const [profilePic, setProfilePic] = React.useState();
  const [profilePicDate, setProfilePicDate] = React.useState();

  const [postAdded, setPostAdded] = React.useState(
    new Date().getTime().toString()
  );

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios
      .post(baseUrl + "/isAuthenticated", config)
      .then((response) => {
        if (response.data === "authenticated") {
          setAuthenticated(true);
          handleData();
        }
      })
      .catch((e) => { });
    axios
      .get(baseUrl + "/userId", config)
      .then((response) => setId(response.data));
  }, [mainDate]);

  const handleData = () => {
    axios
      .get(baseUrl + "/avatar", config)
      .then((response) => setAvatar(response.data));
  };

  return (
    <div className="App" style={{ paddingBottom: '60px' }} >
      <Context.Provider
        value={{
          avatar,
          setAvatar,
          setMainDate,
          mainDate,
          id,
          authenticated,
          setAuthenticated,
          mainMenuValue,
          setMainMenuValue,
          profilePic,
          setProfilePic,
          setProfilePicDate,
          profilePicDate,
          postAdded,
          setPostAdded,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<TopNav />}>
              <Route path="" element={<MainFeed />}></Route>
              <Route path="profile" element={<UserFeed />}>
                <Route path="info" element={<Info />} />
                <Route path="pictures" element={<Pictures />}></Route>
                <Route path="userFriends" element={<UserFriends />}>
                  <Route path="searchResult" element={<SearchResult />} />
                </Route>
                <Route path="posts" element={<UserPosts />} />
              </Route>
              <Route path="friends" element={<Friends />}>
                <Route path=":id" element={<Person />}>
                  <Route path="PersonPictures" element={<PersonPictures />} />
                  <Route path="PersonFriends" element={<PersonFriends />} />
                  <Route path="PersonPosts" element={<PersonPosts />} />
                </Route>
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="invitations" element={<Invitations />} />
                <Route path="blocked" element={<Blocked />} />
                <Route path="friendsList" element={<FriendsList />} />
              </Route>
              <Route path="home" element={<HomeFeed />} />
              <Route path="error" element={<Error />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
