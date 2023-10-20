import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "LikesMovies",
  mongoose.Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
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
    },
    modelOptions
  )
);
