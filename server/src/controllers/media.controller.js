import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import { calculateRating } from "../utils/calculateRating.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;

    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getTrendingList = async (req, res) => {
  try {
    const { page } = req.body;

    const { mediaType, time } = req.params;

    const response = await tmdbApi.mediaTrending({
      mediaType,
      time,
      page,
    });

    responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getTrailerMovie = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const response = await tmdbApi.mediaTrailer({ mediaType, mediaId });

    const officialTrailer = response.results.find(
      (video) => video.name === "Official Trailer"
    );

    responseHandler.ok(
      res,
      officialTrailer
        ? officialTrailer
        : response.results[0]
        ? response.results[0]
        : {}
    );
  } catch (err) {
    responseHandler.error(res);
  }
};

const getMoreInfoMedia = async (req, res) => {
  try {
    ``;
    const { mediaType, mediaId } = req.params;

    const media = await tmdbApi.mediaDetail({ mediaType, mediaId });

    media.credits = await tmdbApi.mediaCredits({ mediaType, mediaId });
    const video = await tmdbApi.mediaTrailer({ mediaType, mediaId });
    const officialTrailer = video.results.find(
      (video) => video.name === "Official Trailer"
    );

    media.officialTrailer = officialTrailer
      ? officialTrailer
      : video.results[0];

    responseHandler.ok(res, media);
  } catch (error) {
    responseHandler.error(res);
  }
};

const similarMovies = async (req, res) => {
  try {
    const { mediaId, mediaType } = req.params;

    const response = await tmdbApi.mediaSimilar({
      mediaType,
      mediaId,
    });

    responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

const heroMovie = async (req, res) => {
  try {
    const { page } = req.query;

    const { mediaType, mediaCategory } = req.params;

    const media = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    let popularMovie = media.results.length > 0 ? media.results.shift() : null;

    const mediaId = popularMovie.id;

    const video = await tmdbApi.mediaTrailer({ mediaType, mediaId });
    const officialTrailer = video.results.find(
      (video) => video.name === "Official Trailer"
    );

    popularMovie.officialTrailer = officialTrailer
      ? officialTrailer
      : video.results[0];

    responseHandler.ok(res, popularMovie);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    const reviews = await reviewModel
      .find({ mediaId, mediaType })
      .populate({
        path: "user",
        select: "id firstName lastName profilePicture",
      })
      .sort("-createdAt");

    media.reviews = reviews;
    media.rating = calculateRating(reviews);

    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({ query, page });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const discover = async (req, res) => {
  const { mediaType, genreId } = req.params;

  try {
    const response = await tmdbApi.mediaDiscover({ mediaType, genreId });
    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getList,
  getGenres,
  getTrendingList,
  getTrailerMovie,
  getMoreInfoMedia,
  similarMovies,
  heroMovie,
  getDetail,
  search,
  discover,
};
