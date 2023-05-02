import * as React from "react";
import { Buffer } from "buffer";
import IconButton from "@mui/material/IconButton";
import { Grid, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { theme } from "../../../theme";

function Picture(props) {
  return (
    <Grid item xs={4} sm={4} md={4} key={props.index}>
      <Paper
        sx={{
          boxShadow: "0px 0px 4px 2px rgba(68,68,68,0.49)",
          maxWidth: "500px",
          margin: "25px auto",
        }}
      >
        <Box
          id={props.index}
          sx={{
            backgroundImage:
              "url(data:image/jpeg;base64," +
              Buffer.from(props.picture.picture.data, "binary").toString(
                "base64"
              ) +
              ")",
            width: "100%",
            height: "360px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
            [theme.breakpoints.down("450")]: {
              height: "250px",
            },
          }}
        >
          <IconButton
            aria-label="settings"
            sx={{
              position: "absolute",
              right: "5px",
              top: "5px",
            }}
          >
            <MoreVertIcon
              id="basic-button"
              _id={props.picture._id}
              aria-controls={props.open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={props.open ? "true" : undefined}
              onClick={(e) => {
                props.handleClick(e);
                props.setCurrentPicture(props.picture._id);
              }}
            />
          </IconButton>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={props.anchorEl}
          open={props.open}
          onClose={(e) => {
            props.handleClose();
          }}
          MenuListProps={{
            style: { background: "#080808" },
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              props.setDeleting(true);
              props.deletePicture(props.currentPicture);
            }}
          >
            Delete
            {props.deleting ? (
              <CircularProgress size={12} sx={{ ml: 1 }} />
            ) : (
              <DeleteForeverIcon
                sx={{ ml: 1, transform: "translateY(-10%)" }}
              />
            )}
          </MenuItem>
        </Menu>
      </Paper>
    </Grid>
  );
}

export default Picture;
