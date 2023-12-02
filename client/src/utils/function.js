import tmdbConfigs from "../api/configs/tmdb.configs";

export const getRandomNumber = (minNumber, maxNumber) =>
  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

export const formatMinuteToReadable = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;
  if (h > 0) {
    return `${h}h ${m}m`;
  } else {
    return `${m}m`;
  }
};

export const getRandomSeasons = (time) =>
  time ? `${Math.floor(Math.random() * time + 2)} seasons` : "";

export const getFormatTime = (mediaType, time) => {
  console.log(mediaType, time);
  if (mediaType === tmdbConfigs.mediaType.movie && time) {
    return formatMinuteToReadable(time);
  } else {
    return time ? `${time} seasons` : "";
  }
};

export const getReleaseYear = (mediaType, date) => {
  if (mediaType === tmdbConfigs.mediaType.movie) {
    return date && date.split("-")[0];
  } else {
    return date && date.split("-")[0];
  }
};
