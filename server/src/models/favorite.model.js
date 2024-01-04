import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      adult: {
        type: Boolean,
        required: false,
      },
      backdrop_path: {
        type: String,
      },
      genre_ids: {
        type: Array,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      original_language: {
        type: String,
      },
      original_title: {
        type: String,
      },
      overview: {
        type: String,
      },
      popularity: {
        type: Number,
      },
      poster_path: {
        type: String,
      },
      release_date: {
        type: String,
      },
      title: {
        type: String,
      },
      tagline: {
        type: String,
      },
      vote_average: {
        type: Number,
      },
      vote_count: {
        type: Number,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  )
);
