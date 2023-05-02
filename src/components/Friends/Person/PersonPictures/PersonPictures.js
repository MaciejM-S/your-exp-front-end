import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { theme } from "../../../../theme";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import CircularProgressComponent from "../../../Universal/CircularProgressComponent";
import { Buffer } from "buffer";
import { Typography } from "@mui/material";
import { baseUrl } from "../../../..";

const paperStyle = {
  boxShadow: "0px 0px 4px 2px rgba(68,68,68,0.49)",
  maxWidth: "500px",
  margin: "15px auto",
  [theme.breakpoints.down(400)]: {
    margin: "5px auto",
  },
};

const pictureBoxStyle = {
  width: "100%",
  height: "350px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  [theme.breakpoints.down(400)]: {
    height: "200px",
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PersonPictures() {
  const [pictures, setPictures] = React.useState({ pictures: ["fakeItem"] });
  const [loading, setLoading] = React.useState(true);
  const [id] = useOutletContext();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  React.useEffect(() => {
    axios
      .post(baseUrl
        + "/personPictures", { id }, config)
      .then((response) => {
        if (response.data === "restricted") {
          return setPictures({ pictures: ["restricted"] });
        }
        setPictures(response.data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <CircularProgressComponent />;
  }

  if (pictures.pictures[0] === "restricted") {
    return (
      <Typography
        variant="confidentialityVariant"
        component="div"
        sx={{
          margin: "25px auto",
          textAlign: "center",
        }}
      >
        Pictures of this user are restricted for friends only
      </Typography>
    );
  } else if (pictures.pictures.length > 0) {
    if (pictures.pictures[0] !== "fakeItem") {
      return (
        <>
          <Box
            sx={{
              padding: "25px",
              [theme.breakpoints.down(600)]: { padding: "15px" },
            }}
          >
            <Grid
              sx={{ justifyContent: "center" }}
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 4, md: 4, lg: 8, xl: 12 }}
            >
              {pictures &&
                pictures.pictures.map((picture, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    <Paper sx={paperStyle}>
                      <Box
                        id={index}
                        sx={{
                          ...pictureBoxStyle,
                          backgroundImage:
                            "url(data:image/jpeg;base64," +
                            Buffer.from(
                              picture.picture.data,
                              "binary"
                            ).toString("base64") +
                            ")",
                        }}
                      ></Box>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      );
    }
  }
  if (pictures.pictures.length === 0) {
    return (
      <Typography variant="profileNoData">
        This user has not added any photos yet
      </Typography>
    );
  }
  return <></>;
}

export default PersonPictures;
