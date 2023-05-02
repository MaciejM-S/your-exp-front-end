import React from "react";
import { Box } from "@mui/system";

import InitFeed from "./InitFeed";

function MainFeed() {
  return (
    <Box flex={1} sx={{}}>
      <div className="loginMain">
        <InitFeed />
      </div>
    </Box>
  );
}

export default MainFeed;
