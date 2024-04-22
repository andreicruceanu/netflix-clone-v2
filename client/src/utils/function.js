import { configsApp } from "../configs/configsApp";

import tmdbConfigs from "../api/configs/tmdb.configs";
import dayjs from "dayjs";

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

export const totalReview = (value) => {
  if (value === 1) {
    return `${value} review`;
  }
  return `${value} reviews`;
};

export const calculateProgress = (value, totalReviews) =>
  totalReviews !== 0 ? (value / totalReviews) * 100 : 0;

export const formatFullName = (firstName, lastName) =>
  `${firstName} ${lastName}`;

export const formatDate = (dateString) => {
  const formattedDate = dayjs(dateString).fromNow();
  return formattedDate;
};

export const formatReleaseDate = (mediaType, date) => {
  if (mediaType === tmdbConfigs.mediaType.movie) {
    return dayjs(date).format("MMM D, YYYY");
  } else {
    return dayjs(date).format("MMM D, YYYY");
  }
};
export const trailerPath = (key = "L3oOldViIgY") => {
  return `${configsApp.trailerPath}${key}`;
};
