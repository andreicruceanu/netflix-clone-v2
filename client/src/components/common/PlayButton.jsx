import React from "react";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";

const PlayButton = ({ mediaId, mediaType, sx, ...others }) => {
  return (
    <Link to={routesGen.mediaDetail(mediaType, mediaId)}>
      <Button
        color="inherit"
        variant="contained"
        startIcon={
          <PlayArrowIcon
            sx={{
              fontSize: {
                xs: "24px !important",
                sm: "32px !important",
                md: "40px !important",
              },
            }}
          />
        }
        {...others}
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          fontSize: { xs: 18, sm: 24, md: 28 },
          lineHeight: 1.5,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          textTransform: "capitalize",
          ...sx,
        }}
      >
        Play
      </Button>
    </Link>
  );
};

export default PlayButton;
