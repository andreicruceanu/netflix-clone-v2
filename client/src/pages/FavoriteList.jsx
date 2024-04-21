import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import favoriteApi from "../api/modules/favorite.api";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";

const FavoriteList = () => {
  const [count, setCount] = useState(0);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [medias, setMedias] = useState([]);
  const { listFavorites } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));
      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, [dispatch]);

  useEffect(() => {
    setMedias([...listFavorites]);
    setFilteredMedias([...listFavorites.slice(0, skip)]);
    setCount([...listFavorites].length);
  }, [listFavorites]);

  const onLoadMore = () => {
    const startIndex = filteredMedias.length;
    const endIndex = startIndex + skip;
    const newElements = medias.slice(startIndex, endIndex);

    setFilteredMedias([...filteredMedias, ...newElements]);
    setPage(page + 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`My List (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <MediaItem media={media} mediaType={media.mediaType} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button fullWidth onClick={onLoadMore}>
            load more
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
