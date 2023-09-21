import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import ButtonCard from "./ButtonCard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import ButtonFavorite from "./ButtonFavorite";

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const [genreId, setGenreId] = useState([]);

  const { genres } = useSelector((state) => state.genres);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setGenreId(media.genre_ids);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );
    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }
    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Box
      className="card"
      sx={{
        width: "100%",
        height: "175px",
        position: "relative",
        cursor: "pointer",
        "&:hover .overlay-hover": {
          opacity: 0.9,
          visibility: "visible",
          transform: "scale(1.1) translateY(-20px)",
        },
        "&:hover .card-img": {
          visibility: "hidden",
        },
      }}
    >
      <Box
        component={Link}
        to={"/"}
        sx={{ display: "block", width: "100%", height: "100%" }}
      >
        <Box
          className="card-img"
          sx={{
            width: "100%",
            height: "100%",
            ...uiConfigs.style.backgroundImage(posterPath),
          }}
        />
        <Box
          className="overlay-hover"
          sx={{
            opacity: 0,
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            visibility: "hidden",
            transition: "all 0.3s ease",
            zIndex: 999999,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "0 1rem",
              borderRadius: "8px 8px 0px 0px",
              ...uiConfigs.style.backgroundImage(posterPath),
            }}
          />
          <Box
            sx={{
              zIndex: 10,
              background: "rgba(52, 51, 51, 0.8)",
              padding: "1rem",
              position: "absolute",
              width: "100%",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "space-between",
                margin: "0 10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <ButtonCard background={"white"}>
                  <PlayArrowIcon sx={{ color: "black" }} />
                </ButtonCard>
                <ButtonFavorite mediaId={media.id} />
              </Box>
              <ButtonCard>
                <ExpandMoreIcon sx={{ color: "white" }} />
              </ButtonCard>
            </Box>
            <Typography
              variant="body1"
              fontWeight="700"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                ...uiConfigs.style.typoLines(2, "left"),
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#ffd12b",
                  marginRight: ".3rem",
                }}
              >
                <StarRateIcon sx={{ transform: "translateY(-2px)" }} />
                <Typography variant="body1">{rate}</Typography>
              </Box>
              <Typography sx={{ color: "white" }} variant="body1">
                {releaseDate}
              </Typography>
            </Box>
            <List
              sx={{
                color: "white",
                listStyleType: "disc",
                display: "flex",
                flexDirection: "row",
                padding: 0,
              }}
            >
              {[...genreId].slice(0, 3).map((genreId, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: 0,
                    fontSize: "15px",
                    width: "initial",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginRight: "10px",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, marginRight: "5px" }}>
                    <FiberManualRecordIcon style={{ fontSize: 12 }} />
                  </ListItemIcon>
                  {genres.find((e) => e.id === genreId) &&
                    genres.find((e) => e.id === genreId).name}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaItem;
