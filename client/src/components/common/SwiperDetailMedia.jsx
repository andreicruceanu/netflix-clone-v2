import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
const SwiperDetailMedia = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "40%",
            sm: "35%",
            md: "30%",
            lg: "25%",
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
        spaceBetween={10}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default SwiperDetailMedia;
