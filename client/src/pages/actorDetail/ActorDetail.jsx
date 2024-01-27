import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actorApi from "../../api/modules/actor.api";
import { toast } from "react-toastify";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import ActorMediaGrid from "./ActorMediaGrid";
import Container from "../../components/common/Container";
import { setCloseModal } from "../../redux/features/infoModal";

const ActorDetail = () => {
  const { actorId } = useParams();

  const [actor, setActor] = useState();
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.infoModal);

  const handleCloseModal = () => dispatch(setCloseModal());

  useEffect(() => {
    const getActor = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await actorApi.detail({ actorId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setActor(response);
      }
      if (err) toast.error(err.message);
    };
    getActor();
  }, [actorId, dispatch]);

  useEffect(() => {
    if (isOpen) handleCloseModal();
  }, [isOpen]);

  return (
    <>
      <Toolbar />
      {actor && (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                width: { xs: "50%", md: "20%" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "160%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(${tmdbConfigs.posterPath(
                    actor.profile_path
                  )})`,
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                padding: { xs: "1rem 0", md: "1rem 2rem" },
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight="700">
                  {`${actor.name} (${
                    actor.birthday && actor.birthday.split("-")[0]
                  }`}
                  {actor.deathday &&
                    ` - ${actor.deathday && actor.deathday.split("-")[0]}`}
                  {")"}
                </Typography>
                <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                  {actor.biography}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Container header="Medias">
            <ActorMediaGrid actorId={actorId} />
          </Container>
        </Box>
      )}
    </>
  );
};

export default ActorDetail;
