import { Typography } from "@mui/material";
import { theme } from "../../../theme";
import { PersonTypography } from "../../../styles/PersonTypography";

function PersonInfoPanel(props) {
  const info = props.person.info;

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: "white",
          marginLeft: "0px",
          marginTop: "40px",
          [theme.breakpoints.up("lg")]: {
            marginTop: 0,
            marginBottom: "18px",
          },
        }}
      >
        {`${info.firstName} ${info.lastName.toUpperCase()}`}
      </Typography>

      {info.residence ? (
        <PersonTypography>
          lives in:
          <span className="personFeature"> {info.residence}</span>
        </PersonTypography>
      ) : (
        false
      )}

      {info.workplace ? (
        <PersonTypography>
          works in:
          <span className="personFeature"> {info.workplace}</span>
        </PersonTypography>
      ) : (
        false
      )}

      {info.education ? (
        <PersonTypography>
          education:
          <span className="personFeature"> {info.education}</span>
        </PersonTypography>
      ) : (
        false
      )}
    </>
  );
}

export default PersonInfoPanel;
