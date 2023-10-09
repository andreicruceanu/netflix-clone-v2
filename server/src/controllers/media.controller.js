import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
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
      officialTrailer ? officialTrailer : response.results[0]
    );
  } catch (err) {
    responseHandler.error(res);
  }
};

export default { getList, getGenres, getTrendingList, getTrailerMovie };
