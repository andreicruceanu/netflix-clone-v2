import mongoose from "mongoose";
import responseHandler from "../handlers/response.handler.js";
import movieModel from "../models/movie.model.js";
import validateDataFromUser from "../utils/userValidation.js";
import cloudinary from "../utils/cloudinary.js";

const createMovie = async (req, res) => {
  const { title, overview, imdb_id, tagline, runtime, budget, revenue } =
    req.body;

  const id = Math.floor(Math.random() * 100000);

  const movie = new movieModel({
    ...req.body,
    id,
    state_movie: "primary_saved",
    admin_created: req.user.username,
    admin_id: req.user.id,
  });

  await movie.save();

  responseHandler.created(res, {
    ...movie._doc,
  });
  try {
  } catch {
    responseHandler.error(res);
  }
};

const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!movieId) {
    return responseHandler.badrequest(res, "mediaId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return responseHandler.badrequest(res, "Invalid movieId");
  }
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return responseHandler.badrequest(res, "Movie not found");
    }
    res
      .status(200)
      .json({ message: "Movie deleted successfully", result: true });
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const db = mongoose.connection;

    const statusMovie = await db.collection("movieStatus").find().toArray();

    const genresMovie = await db.collection("genresMovie").find().toArray();

    responseHandler.ok(res, { statusMovie, genresMovie });
  } catch {
    responseHandler.error(res);
  }
};

const uploadImages = async (req, res) => {
  const { mediaId } = req.body;

  if (!req.files?.poster || !req.files?.backdrop) {
    return responseHandler.badrequest(res, "poster and backdrop is required!");
  }

  if (!mediaId) {
    return responseHandler.badrequest(res, "mediaId is required");
  }

  const resultUploudPoster = await cloudinary.uploader.upload(
    req.files.poster[0].path,
    {
      folder: "movies",
    }
  );

  const resultUploudBackdrop = await cloudinary.uploader.upload(
    req.files.backdrop[0].path,
    {
      folder: "movies",
    }
  );

  console.log(resultUploudPoster, resultUploudBackdrop);

  if (!resultUploudPoster || !resultUploudBackdrop) {
    return responseHandler.badrequest(res, "Images not upload , try again");
  }

  const mediaIdFormated = parseInt(mediaId, 10);

  try {
    const movie = await movieModel.findOne({ id: mediaIdFormated });

    if (!movie) {
      return responseHandler.notfound(res);
    }

    const movieUpdateImages = await movieModel.findByIdAndUpdate(
      movie._id,
      {
        $set: {
          backdrop_path: resultUploudBackdrop.secure_url,
          poster_path: resultUploudPoster.secure_url,
          state_movie: "images_saved",
        },
      },
      { new: true }
    );

    if (!movieUpdateImages) {
      return responseHandler.notfound(res);
    }

    responseHandler.ok(res, movieUpdateImages);
  } catch (error) {
    responseHandler.error(res);
  }
};

const addVideoMovie = async (req, res) => {
  const { key, siteMovie, typeVideo, mediaId } = req.body;

  const validationResult = validateDataFromUser.addVideoMovie({
    ...req.body,
  });

  if (validationResult.error) {
    return responseHandler.badrequest(
      res,
      validationResult.error.details[0].message
    );
  }

  const mediaIdFormated = parseInt(mediaId, 10);

  try {
    const movie = await movieModel.findOne({ id: mediaIdFormated });

    if (!movie) {
      return responseHandler.notfound(res);
    }

    const movieUpdateVideo = await movieModel.findByIdAndUpdate(
      movie._id,
      {
        $set: {
          officialTrailer: {
            id: Math.floor(Math.random() * 100000),
            key,
            name: typeVideo,
            site: siteMovie,
            type: typeVideo,
          },
          state_movie: "completed",
        },
      },
      { new: true }
    );

    if (!movieUpdateVideo) {
      return responseHandler.notfound(res);
    }

    responseHandler.ok(res, movieUpdateVideo);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  createMovie,
  getInfo,
  uploadImages,
  deleteMovie,
  addVideoMovie,
};
