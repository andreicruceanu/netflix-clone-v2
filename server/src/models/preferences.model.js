import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Preferences",
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
      isLiked: {
        type: Boolean,
        default: false,
      },
      isDisliked: {
        type: Boolean,
        default: false,
      },
    },
    modelOptions
  )
);
