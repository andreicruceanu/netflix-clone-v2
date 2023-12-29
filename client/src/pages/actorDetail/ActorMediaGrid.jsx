import React, { useEffect, useState } from "react";
import actorApi from "../../api/modules/actor.api";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";

const ActorMediaGrid = ({ actorId }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await actorApi.medias({ actorId });

      if (response) {
        setMedias(response);
      }
      if (err) toast.error(err.message);
    };
    getMedias();
  }, [actorId]);

  console.log(medias);
  return (
    <>
      <Grid></Grid>
    </>
  );
};

export default ActorMediaGrid;
