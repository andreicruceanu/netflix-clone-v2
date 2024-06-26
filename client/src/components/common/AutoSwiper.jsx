import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css";

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "32%",
            sm: "27%",
            md: "22%",
            lg: "17%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        navigation
        style={{
          width: "100%",
          height: "max-content",
          overflow: "visible",
          overflowX: "clip",
        }}
        spaceBetween={8}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
