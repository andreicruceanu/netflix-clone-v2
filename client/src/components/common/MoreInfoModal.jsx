import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import { useTheme } from "@emotion/react";
import Loading from "./Loading";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ButtonCard from "./ButtonCard";
import ButtonFavorite from "./ButtonFavorite";

function MoreInfoModal({ open, onClose, mediaId, mediaType }) {
  const [media, setMedia] = useState();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open && mediaType && mediaId) {
      const getMoreDetails = async () => {
        const { response, err } = await mediaApi.getMoreDetails({
          mediaType,
          mediaId,
        });
        setIsLoading(false);
        if (response) {
          setMedia(response);
        }
        if (err) {
          console.log(err);
        }
      };

      getMoreDetails();
    }
  }, [mediaType, mediaId, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: { xs: "300px", md: "850px", lg: "900px" },
          minHeight: { xs: "420px", md: "520px", lg: "700px" },
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          position: "absolute",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "black",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Box sx={{ flex: 1, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "white",
                  padding: "0",
                  zIndex: "9999999",
                  borderRadius: "50px",
                  background: "black",
                }}
              >
                <Button
                  sx={{ padding: "0.4rem", minWidth: "max-content" }}
                  variant="text"
                >
                  <CloseIcon
                    sx={{ color: "white", fontSize: "1.3rem" }}
                    onClick={onClose}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",
                  zIndex: "9999",
                  ...uiConfigs.style.backgroundImageMoreDetails(
                    tmdbConfigs.posterPath(
                      media.backdrop_path || media.poster_path
                    )
                  ),
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    ...uiConfigs.style.horizontalGradientBgImage[
                      theme.palette.mode
                    ],
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    ...uiConfigs.style.gradientBgImage[theme.palette.mode],
                  }}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, padding: "0px 40px 40px 40px" }}>
              <Typography
                variant="h4"
                fontSize={{ xs: "0.3rem", md: "1rem", lg: "2rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {media.title || media.name}
              </Typography>
              <Stack
                sx={{ marginTop: "15px" }}
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  componet={Link}
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    width: "max-content",
                    backgroundColor: "white",
                    color: "black",
                    "&:hover .MuiButton-root": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  Play
                </Button>
                <ButtonCard>
                  <ButtonFavorite media={media} mediaType={mediaType} />
                </ButtonCard>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default MoreInfoModal;
