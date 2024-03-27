import responseHandler from "../handlers/response.handler.js";
import movieModel from "../models/movie.model.js";
import userModel from "../models/user.model.js";
import userAdminModel from "../models/userAdmin.model.js";
import moment from "moment";
import { calculateTrending } from "../utils/calculateTrending.js";
import { getRecordsPerDay } from "../utils/getRecordsPerDay.js";

const getInfo = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalMovies = await movieModel.countDocuments({
      state_movie: "completed",
    });
    const totalAdmins = await userAdminModel.countDocuments();

    const lastTenBooksCreated = await movieModel
      .find({
        state_movie: "completed",
      })
      .sort({ createdDt: -1 })
      .limit(10);

    const infoAllMoviesAndUsers = [
      {
        title: "Total Users",
        value: totalUsers,
        trending: calculateTrending(20, -10),
        state: "users",
      },
      {
        title: "Total Admins",
        value: totalAdmins,
        trending: calculateTrending(20, -10),
        state: "admins",
      },
      {
        title: "Total Movies",
        value: totalMovies,
        trending: calculateTrending(20, -10),
        state: "movies",
      },
      {
        title: "Total Movies",
        value: totalMovies,
        trending: calculateTrending(20, -10),
        state: "movies",
      },
    ];

    responseHandler.ok(res, { infoAllMoviesAndUsers, lastTenBooksCreated });
  } catch (error) {
    responseHandler.error(res);
  }
};

const movieData = async (req, res) => {
  try {
    //const usersPerDay = await getRecordsPerDay("users");
    // const adminsPerDay = await getRecordsPerDay("adminusers");
    // const moviesPerDay = await getRecordsPerDay("movies");
    //

    return;
  } catch (error) {
    responseHandler.error(res);
  }
};

const getAllUsersApp = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    responseHandler.ok(res, allUsers);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await movieModel.find({});

    responseHandler.ok(res, allMovies);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getMovie = async (req, res) => {
  const { mediaId } = req.params;

  try {
    if (!mediaId) {
      return responseHandler.badrequest(res, "Media Id is required !");
    }
    const movie = await movieModel.findById(mediaId);

    if (!movie) {
      return responseHandler.ok(res, {
        data: null,
        message: "Movie not found",
      });
    }

    responseHandler.ok(res, { data: movie });
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { getInfo, movieData, getAllUsersApp, getAllMovies, getMovie };
