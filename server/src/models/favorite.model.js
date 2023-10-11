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
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: Number,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaGenreIds: {
        type: Array,
        required: true,
      },
      mediaRate: {
        type: Number,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaReleaseDate: {
        type: String,
        required: true,
      },
    },
    modelOptions
  )
);
