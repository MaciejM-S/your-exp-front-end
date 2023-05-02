import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import PageviewIcon from "@mui/icons-material/Pageview";
import { theme } from "../../theme";
import { CircularProgress, Box, Avatar } from "@mui/material";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import CancelIcon from "@mui/icons-material/Cancel";
import mainSearchStyle from "./mainSearchStyle";
import { baseUrl } from "../..";
const {
  searchIconStyle,
  mainBoxStyle,
  boxStyle,
  formHeleperTextStyle,
  cancelIconStyle,
  circularProgressStyle
} = mainSearchStyle;

export default function MainSearch() {
  const [value, setValue] = React.useState(null);
  const context = React.useContext(Context);
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [displayHelperText, setDisplayHelperText] = React.useState("none");
  const [inqExist, setInqExist] = React.useState(false);
  const [stopLoading, setStopLoading] = React.useState(false);
  const [searchStyle, setSearchStyle] = React.useState({ left: "-500px" });
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleMainInput = (inq) => {
    setLoadingSearch(true);
    inq.length > 0 && setStopLoading(false);
    if (inq.length > 0) {
      setInqExist(true);
      axios
        .post(baseUrl + "/mainSearch", { inq }, config)
        .then((result) => {
          if (result.data.length > 0 || !stopLoading) {
            setResult(result.data);
          } else {
            setResult([]);
            setDisplayHelperText("block");
          }
          setLoadingSearch(false);
        });
    } else if (inq.length === 0) {
      setResult([]);
      setInqExist(false);
      setDisplayHelperText("none");
      setStopLoading(true);
      setLoadingSearch(false);
    }
  };
  const handleSearchIcon = () => {
    searchStyle.left !== "25px"
      ? setSearchStyle({ left: "25px" })
      : setSearchStyle({ left: "-500px" });
  };

  const handleSearchResult = (option) => {
    navigate(`friends/${option._id}/PersonPictures`);
    setResult([]);
    setInputValue("");
    setDisplayHelperText("none");
    setInqExist(false);
    context.setMainDate(new Date().getTime().toString());
  };

  return (
    <Box sx={boxStyle}>
      <SearchIcon
        sx={{
          ...searchIconStyle,
          [theme.breakpoints.down("md")]: { display: "none" },
        }}
      />
      <PageviewIcon
        sx={{
          ...searchIconStyle,
          [theme.breakpoints.up("md")]: { display: "none" },
          transform: "scale(1.8)",
          cursor: "pointer",
        }}
        onClick={handleSearchIcon}
      />
      <Autocomplete
        sx={{
          width: "calc(15vw + 25px)",
          [theme.breakpoints.down("md")]: {
            display: "block",
            position: "fixed",
            width: "250px",
            top: "95px",
            transition: "0.6s",
            left: "-500px",
            background: theme.palette.lightGray,
            ...searchStyle,
          },
        }}
        value={value}
        forcePopupIcon={false}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        noOptionsText={"no options"}
        inputValue={inputValue}
        autoHighlight
        options={result}
        getOptionLabel={(option) => {
          return option.lastName + " " + option.firstName;
        }}
        renderOption={(props, option) => {
          return (
            <Box component="li" onClick={()=>{handleSearchResult(option)}} sx={mainBoxStyle}>
              <Avatar
                sx={{ mr: 1 }}
                loading="lazy"
                width="20"
                src={
                  option.avatar &&
                  option.avatar.data &&
                  "data:image/jpeg" +
                    ";base64," +
                    Buffer.from(option.avatar.data, "binary").toString("base64")
                }
                alt="avatar"
              />
              <Box sx={{ maxWidth: "75px" }}>
                {option.firstName} {option.lastName}
              </Box>
              {option.residence ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                    mr: "10%",
                  }}
                >
                  <span
                    style={{
                      margin: "0px 2px 0 10px",
                      fontWeight: 200,
                      fontSize: "10px",
                    }}
                  >
                    lives in:
                  </span>
                  <span style={{ margin: "0px 2px 0 10px", fontSize: "12px" }}>
                    {option.residence}
                  </span>
                </Box>
              ) : (
                false
              )}
            </Box>
          );
        }}
        onInputChange={(event, newInputValue) => {
          if (newInputValue.length > 15 || !context.authenticated) return;
          setInputValue(newInputValue);
          handleMainInput(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            disabled={true}
            {...params}
            label="Search for e.g. Kowalski"
            helperText={"no search results"}
            FormHelperTextProps={{
              sx: {
                ...formHeleperTextStyle,
                display: displayHelperText,
              },
            }}
          ></TextField>
        )}
      />
      <CancelIcon 
      sx={{...cancelIconStyle,  
        left: searchStyle.left === "-500px" ? "-300px" : "230px"
      }} 
        onClick={handleSearchIcon} />
      {loadingSearch && <CircularProgress sx={circularProgressStyle} />}
    </Box>
  );
}
