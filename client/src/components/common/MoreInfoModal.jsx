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
import { toast } from "react-toastify";
import Preferences from "./Preferences";

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
          console.log(response);
        }
        if (err) {
          toast.error(err.message);
        }
      };

      getMoreDetails();
    }
  }, [mediaType, mediaId, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: { xs: "300px", md: "850px", lg: "850px" },
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
            <Box sx={{ flex: 2, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 999999,
                  bottom: "10px",
                  left: "50px",
                }}
              >
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
                  <Preferences mediaId={media.id} mediaType={mediaType} />
                </Stack>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "white",
                  padding: "0",
                  zIndex: 4,
                  borderRadius: "50px",
                  background: "black",
                }}
              >
                <Button
                  sx={{
                    padding: "0.5rem",
                    minWidth: "max-content",
                    border: "2px solid grey",
                    borderRadius: "50%",
                    color: "white",
                    transition: ".3s ease",
                    "&:hover": {
                      borderColor: "white",
                    },
                  }}
                  variant="text"
                >
                  <CloseIcon
                    sx={{
                      fontSize: "1.3rem",
                    }}
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
                  zIndex: 2,
                  ...uiConfigs.style.backgroundImageMoreDetails(
                    tmdbConfigs.posterPath(
                      media.backdrop_path || media.poster_path
                    )
                  ),
                }}
              >
                <Box
                  sx={{
                    width: "50%",
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
            <Box
              sx={{
                flex: 1,
                mt: 1,
                position: "relative",
                backgroundColor: "black",
              }}
            >
              <Box sx={{ padding: "0 3rem" }}>
                <Box
                  sx={{
                    display: "grid",
                    columnGap: "2em",
                    gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ margin: "4px 8px 4px 0px " }}>
                        <Typography
                          sx={{
                            color: "#46d369",
                            whiteSpace: "unset",
                            fontWeight: 500,
                          }}
                        >
                          85% concordance
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#bcbcbc",
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          sx={{
                            marginRight: "8px",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          2023
                        </Typography>
                        <Typography
                          sx={{
                            marginRight: "8px",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          1h 23min
                        </Typography>
                        <Typography
                          sx={{
                            border: "1px solid grey",
                            borderRadius: "3px",
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "0 3px",
                          }}
                        >
                          HD
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ margin: "16px 0px 4px" }}>
                      <Typography
                        sx={{ letterSpacing: 0, textAlign: "justify" }}
                      >
                        {media.overview}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      letterSpacing: 0,
                    }}
                  >
                    <Box
                      sx={{
                        boxSizing: "border-box",
                        wordBreak: "break-word",
                        margin: "7px 7px 7px 0",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#777",
                          wordBreak: "break-word",
                          marginRight: "4px",
                        }}
                        component="span"
                      >
                        Cast:
                      </Typography>
                      {media.credits.cast.slice(0, 5).map((item, index) => (
                        <Typography
                          sx={{
                            color: "#ddd",
                            textDecoration: "none",
                            wordBreak: "break-word",
                            marginRight: "2px",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "white",
                            },
                          }}
                          key={index}
                          component={Link}
                          to={"/test"}
                        >
                          {item.name}
                          {index < 4 && <span>, </span>}
                        </Typography>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        boxSizing: "border-box",
                        wordBreak: "break-word",
                        margin: "7px 7px 7px 0",
                        fontSize: "14px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#777",
                          wordBreak: "break-word",
                          marginRight: "4px",
                        }}
                        component="span"
                      >
                        Genres:
                      </Typography>
                      {media.genres.map((item, index) => (
                        <Typography
                          sx={{
                            color: "#ddd",
                            textDecoration: "none",
                            wordBreak: "break-word",
                            marginRight: "3px",
                          }}
                          key={index}
                          component="span"
                        >
                          {item.name}
                          {index < media.genres.length - 1 && <span>, </span>}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default MoreInfoModal;
