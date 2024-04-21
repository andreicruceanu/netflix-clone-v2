import { Card, CardContent, Stack, Typography } from "@mui/material";
import { getReleaseYear } from "../../utils/function";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { useRandom } from "../../hook/useRandom";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import MaxLineTypography from "./MaxLineTypography";
import ChipNetflix from "./ChipNetflix";
import NetflixIconButton from "./NetflixIconButton";
import ButtonFavorite from "./ButtonFavorite";

const SimilarVideoCard = ({ movie, mediaType }) => {
  const { randomMatch, randomAge, randomDuration } = useRandom(mediaType);

  return (
    <Card>
      <Link to={routesGen.mediaDetail(mediaType, movie.id)}>
        <div
          style={{
            width: "100%",
            height: "100%",
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
            <Typography variant="subtitle2">{randomDuration}</Typography>
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
      </Link>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <div>
              <Typography variant="subtitle2" sx={{ color: "success.main" }}>
                {randomMatch}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <ChipNetflix label={randomAge} />
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
