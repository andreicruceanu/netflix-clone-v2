const mediaType = {
  movie: "movie",
  tv: "tv",
  person: "person",
};
const genresName = {
  comedy: "Comedy",
  family: "Family",
  documentary: "Documentary",
  drama: "Drama",
  reality: "Reality",
  action: "Action",
  war: "War & Politics",
  actionTv: "Action & Adventure",
  kids: "Kids",
  horror: "Horror",
  adventure: "Adventure",
};
const time = {
  day: "day",
  week: "week",
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

const backdropPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) =>
  imgEndpoint ? `https://image.tmdb.org/t/p/w500${imgEndpoint}` : undefined;

const posterPathW300 = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/w300${imgEndpoint}`;

const similarMoviesImg = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/w780${imgEndpoint}`;

// const youtubePath = (videoId) =>
//   `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&color=white&controls=0&playsinline=0&rel=0&enablejsapi=1`;

const youtubePath = (key) => `https://www.youtube.com/watch?v=${key}`;

const youtubePhoto = (key) => `https://img.youtube.com/vi/${key}/mqdefault.jpg`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
  similarMoviesImg,
  time,
  youtubePhoto,
  genresName,
  posterPathW300,
};

export default tmdbConfigs;
