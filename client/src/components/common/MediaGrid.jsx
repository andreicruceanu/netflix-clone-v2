import { Grid } from "@mui/material";

import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <Grid
      container
      rowGap={5}
      spacing={1}
      sx={{ marginRight: "-8px!important" }}
    >
      {medias.map((media, index) => (
        <Grid item xs={6} sm={5} md={2.2} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
