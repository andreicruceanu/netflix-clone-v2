import React, { useEffect, useState } from "react";
import actorApi from "../../api/modules/actor.api";
import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import MediaItem from "../../components/common/MediaItem";
const ActorMediaGrid = ({ actorId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await actorApi.medias({ actorId });

      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, skip));
      }
      if (err) toast.error(err.message);
    };
    getMedias();
  }, [actorId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };
  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mr: "-8px !important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore} sx={{ margin: " 10px auto" }} fullWidth>
          load More
        </Button>
      )}
    </>
  );
};

export default ActorMediaGrid;
