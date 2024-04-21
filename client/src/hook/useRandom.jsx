import { useMemo } from "react";

import tmdbConfigs from "../api/configs/tmdb.configs";
import {
  formatMinuteToReadable,
  getRandomNumber,
  getRandomSeasons,
} from "../utils/function.js";

export const useRandom = (mediaType) => {
  const randomMatch = useMemo(() => `${getRandomNumber(50, 100)}% Match`, []);
  const randomAge = useMemo(() => `${getRandomNumber(9, 17)}+`, []);
  const randomDuration = useMemo(
    () =>
      mediaType === tmdbConfigs.mediaType.movie
        ? formatMinuteToReadable(getRandomNumber(90, 160))
        : getRandomSeasons(6),
    [mediaType]
  );

  return { randomMatch, randomAge, randomDuration };
};
