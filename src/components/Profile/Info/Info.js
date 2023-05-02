import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import UsersInfo from "./UsersInfo.js";
import axios from "axios";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ConfidentialitySet from "./ConfidentialitySet/ConfidentialitySet.js";
import { Context } from "../../../App.js";
import { useOutletContext } from "react-router-dom";
import infoStyle from "./infoStyle.js";
import CircularProgressComponent from "../../Universal/CircularProgressComponent.js";
import SaveButton from "./SaveButton.js";
import ButtonGroupComponent from "./ButtonGroupComponent";
import { baseUrl } from "../../../index.js";
const { cardStyle, arrowBackStyle, cardContentStyle } = infoStyle;

function Info() {
   const context = React.useContext(Context);
  let [setParentTime] = useOutletContext();
  const [edit, setEdit] = useState(false);
  const [focus, setFocus] = useState();
  const [value, setValue] = React.useState({
    firstName: "",
    secondName: "",
    residence: "",
    education: "",
    workplace: "",
  });
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    residence: "",
    education: "",
    workplace: "",
  });
  const [loading, setLoading] = React.useState(true);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };  
  React.useEffect(() => {
    handleData();
  }, []);
  let style = {
    border: "none",
    marginTop: "5px",
    display: "none",
    width: "300px",
  };

  if (edit) {
    style.border = "solid 1px black";
    style.marginTop = "25px";
    style.display = "block";
    style.width = "400px";
  }
  const validateInfo = (value, feature) => {
    if (feature === "firstName" || feature === "lastName") {
      if (value === "") {
        return setErrors({ ...errors, [feature]: "this field is required" });
      } else if (value.length > 20) {
        return setErrors({
          ...errors,
          [feature]: "maximal first name length is 20 characters",
        });
      } else {
        return setErrors({ ...errors, [feature]: "" });
      }
    }
    if (
      feature === "residance" ||
      feature === "education" ||
      feature === "workplace"
    ) {
      if (value.length > 30) {
        return setErrors({
          ...errors,
          [feature]: "maximal length is 30 characters",
        });
      } else {
        return setErrors({ ...errors, [feature]: "" });
      }
    }
  };


  const handleData = () => {
    axios.get(baseUrl
      + "/userInfo", config).then((response) => {
      setParentTime(new Date());
      setValue(response.data);
      setLoading(false);
    });
  };

  const save = () => {
    for (const property in errors) {
      if (errors[property] != false) {
        return;
      }
    }
    axios
      .post(baseUrl
        + "/saveUserInfo", value, config)
      .then((response) => {
        setEdit(false);
        const avatar = context.avatar;
        avatar.info.firstName = value.firstName;
        avatar.info.lastName = value.lastName;
        context.setAvatar(avatar);
        setParentTime(new Date().getTime().toString());
      });
  };

  const [confinedtialitySet, setConfidentialitySet] = React.useState(false);
  if (confinedtialitySet) {
    return <ConfidentialitySet setConfidentialitySet={setConfidentialitySet} />;
  }
  if (loading) {
    return <CircularProgressComponent />;
  }

  return (
    <Card sx={{ ...cardStyle, marginTop: style.marginTop }}>
      <CardContent
        sx={{ ...cardContentStyle, width: style.width, border: style.border }}
      >
        <UsersInfo
          feature={"firstName"}
          value={value}
          setValue={setValue}
          edit={edit}
          errors={errors}
          validateInfo={validateInfo}
          setEdit={setEdit}
          focus={focus === "firstName" ? true : false}
          setFocus={setFocus}
        />
        <UsersInfo
          feature={"lastName"}
          value={value}
          setValue={setValue}
          edit={edit}
          errors={errors}
          validateInfo={validateInfo}
          setEdit={setEdit}
          focus={focus === "lastName" ? true : false}
          setFocus={setFocus}
        />
        <UsersInfo
          feature={"residence"}
          value={value}
          setValue={setValue}
          edit={edit}
          errors={errors}
          validateInfo={validateInfo}
          setEdit={setEdit}
          focus={focus === "residence" ? true : false}
          setFocus={setFocus}
        />
        <UsersInfo
          feature={"education"}
          value={value}
          setValue={setValue}
          edit={edit}
          errors={errors}
          validateInfo={validateInfo}
          setEdit={setEdit}
          focus={focus === "education" ? true : false}
          setFocus={setFocus}
        />
        <UsersInfo
          feature={"workplace"}
          value={value}
          setValue={setValue}
          edit={edit}
          errors={errors}
          validateInfo={validateInfo}
          setEdit={setEdit}
          focus={focus === "workplace" ? true : false}
          setFocus={setFocus}
        />
        <Box
          sx={{ ...arrowBackStyle, display: style.display }}
          onClick={() => {
            setEdit(false);
            handleData();
          }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </Box>
      </CardContent>
      {edit ? (
        <SaveButton save={save} />
      ) : (
        <ButtonGroupComponent
          setEdit={setEdit}
          setConfidentialitySet={setConfidentialitySet}
        />
      )}
    </Card>
  );
}

export default Info;
