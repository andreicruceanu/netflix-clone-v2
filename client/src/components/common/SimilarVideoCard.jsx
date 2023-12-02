import { Card, CardContent, Stack, Typography } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import {
  formatMinuteToReadable,
  getRandomNumber,
  getReleaseYear,
} from "../../utils/function";
import MaxLineTypography from "./MaxLineTypography";
import ChipNetflix from "./ChipNetflix";
import NetflixIconButton from "./NetflixIconButton";
import ButtonFavorite from "./ButtonFavorite";

const SimilarVideoCard = ({ movie, mediaType }) => {
  return (
    <Card>
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <img
          src={tmdbConfigs.similarMoviesImg(
            movie.backdrop_path ||
              movie.poster_path ||
              movie.mediaPoster ||
              movie.profile_path
          )}
          style={{
            top: 0,
            height: "100%",
            position: "absolute",
          }}
          alt={movie.name}
        />
        <div
          style={{
            top: 10,
            right: 15,
            position: "absolute",
          }}
        >
          <Typography variant="subtitle2">{`${formatMinuteToReadable(
            getRandomNumber(80, 150)
          )}`}</Typography>
        </div>
        <div
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "4px",
            position: "absolute",
          }}
        >
          <MaxLineTypography
            maxLine={1}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="subtitle1"
          >
            {movie.title || movie.name}
          </MaxLineTypography>
        </div>
      </div>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <div>
              <Typography
                variant="subtitle2"
                sx={{ color: "success.main" }}
              >{`${getRandomNumber(50, 100)}% Match`}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <ChipNetflix label={`${getRandomNumber(9, 17)}+`} />
                <Typography variant="body2">
                  {getReleaseYear(
                    mediaType,
                    movie?.release_date || movie?.first_air_date
                  )}
                </Typography>
              </Stack>
            </div>
            <div style={{ flexGrow: 1 }} />
            <NetflixIconButton sx={{ padding: 0 }}>
              <ButtonFavorite media={movie} mediaType={mediaType} />
            </NetflixIconButton>
          </Stack>
          <MaxLineTypography maxLine={4} variant="subtitle2">
            {movie.overview}
          </MaxLineTypography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SimilarVideoCard;
