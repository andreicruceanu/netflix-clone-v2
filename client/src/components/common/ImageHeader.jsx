import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import uiConfigs from "../../configs/ui.configs";

const ImageHeader = ({ imgPath }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        zIndex: "-1",
        position: "relative",
        paddingTop: { xs: "70%", sm: "55%", md: "40%" },
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: `url(${imgPath})`,
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    />
  );
};

export default ImageHeader;
