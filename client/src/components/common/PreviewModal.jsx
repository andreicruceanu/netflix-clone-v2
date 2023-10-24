import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import ButtonCard from "./ButtonCard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSelector } from "react-redux";
import ButtonFavorite from "./ButtonFavorite";
import TrailerVideo from "./TrailerVideo";
import MoreInfoModal from "./MoreInfoModal";
import Preferences from "./Preferences";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

function PreviewModal({ media, mediaType, setHover }) {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const [genreId, setGenreId] = useState([]);
  const [mediaId, setMediaId] = useState(null);

  const { genresMovie } = useSelector((state) => state.genres);
  const { genresSeries } = useSelector((state) => state.genres);

  useEffect(() => {
    setMediaId(media.id);
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

  const [isModalOpen, setIsModalOpen] = useState({
    trailerModal: false,
    moreDetails: false,
  });
  const handleOpenModal = (modalName) => {
    setIsModalOpen({ ...isModalOpen, [modalName]: true });
  };
  const onClose = (modalName) => {
    setIsModalOpen({ ...isModalOpen, [modalName]: false });
  };

  const [isOpen, setIsOpen] = useState(true);

  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (mediaType && mediaId) {
      const getTrailer = async () => {
        const { response, err } = await mediaApi.getTrailer({
          mediaType,
          mediaId,
        });
        if (response && response.data !== "") {
          setTrailer(response);
          console.log(response);
        }
        if (err) {
          toast.error(err.message);
        }
      };
      getTrailer();
    }
  }, [mediaType, mediaId]);

  return (
    <>
      <TrailerVideo
        open={isModalOpen.trailerModal}
        onClose={() => onClose("trailerModal")}
        mediaType={mediaType}
        mediaId={media.id}
      />
      <MoreInfoModal
        open={isModalOpen.moreDetails}
        onClose={() => onClose("moreDetails")}
        mediaType={mediaType}
        mediaId={media.id}
      />
      <Modal open={isOpen} sx={{ left: "200px", top: "100px" }}>
        <Box
          sx={{
            position: "absolute",
            width: "435px",
            height: "440px",
            transition: "all 0.3s ease",
            zIndex: 999999,
          }}
        >
          {trailer ? (
            <Box sx={{ height: "max-content" }}>
              <iframe
                key={trailer.key}
                src={tmdbConfigs.youtubePath(trailer.key)}
                width="100%"
                title={trailer.id}
                style={{ border: 0 }}
                allow="accelerometer; autoplay;"
              ></iframe>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "50%",
                borderRadius: "8px 8px 0px 0px",
                ...uiConfigs.style.backgroundImage(posterPath),
              }}
            />
          )}
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
                  <PlayArrowIcon
                    onClick={() => handleOpenModal("trailerModal")}
                  />
                </ButtonCard>
                <ButtonCard>
                  <ButtonFavorite media={media} mediaType={mediaType} />
                </ButtonCard>
                <Preferences mediaId={media.id} mediaType={mediaType} />
              </Box>
              <ButtonCard>
                <ExpandMoreIcon
                  sx={{ color: "white" }}
                  onClick={() => handleOpenModal("moreDetails")}
                />
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
              {(genresMovie.length > 0 || genresSeries.length > 0) &&
                [...genreId].slice(0, 3).map((genreId, index) => (
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
                    {mediaType === "movie" && genresMovie
                      ? genresMovie.find((e) => e.id === genreId)?.name
                      : mediaType === "tv" && genresSeries
                      ? genresSeries.find((e) => e.id === genreId)?.name
                      : null}
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PreviewModal;
