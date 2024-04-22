import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { routesGen } from "../../../routes/routes";

import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import Img from "../../../components/common/Img";
import Avatar from "../../../assets/images/avatar.png";
import tmdbConfigs from "../../../api/configs/tmdb.configs";

const Cast = ({ casts }) => {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <ContainerMediaDetails>
        <Typography
          sx={{
            fontSize: "24px",
            color: "white",
            marginBottom: "25px",
            fontWeight: 600,
          }}
        >
          Top Cast
        </Typography>
        <Box
          sx={{
            "& .swiper-slide": {
              width: { xs: "125px", md: "175px" },
              color: "primary.contrastText",
            },
          }}
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            grabCursor={true}
            style={{ width: "100%", height: "max-content" }}
          >
            {casts.map((cast, index) => (
              <SwiperSlide key={index}>
                <Link to={routesGen.actor(cast.id)} className="LinkCast">
                  <Box
                    sx={{
                      width: { xs: "125px", md: "175px" },
                      height: { xs: "125px", md: "175px" },
                      overflow: "hidden",
                      borderRadius: "50%",
                      marginBottom: { xs: "20px", md: "25px" },
                      textAlign: "center",
                    }}
                  >
                    {cast.profile_path ? (
                      <Img
                        src={tmdbConfigs.posterPath(cast.profile_path)}
                        alt={cast?.name}
                        className="castImg"
                      />
                    ) : (
                      <Img src={Avatar} alt={cast?.name} className="castImg" />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "18px" },
                      lineHeight: { xs: "20px", md: "25px" },
                      fontWeight: 600,
                    }}
                  >
                    {cast.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      lineHeight: { xs: "20px", md: "25px" },
                      fontWeight: 600,
                      opacity: 0.5,
                    }}
                  >
                    {cast.character}
                  </Typography>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </ContainerMediaDetails>
    </Box>
  );
};

export default Cast;
