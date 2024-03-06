import mongoose, { Schema } from "mongoose";
const officialTrailerSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
});
export default mongoose.model(
  "Movie",
  mongoose.Schema(
    {
      id: {
        type: Number,
        required: true,
      },
      original_language: {
        type: String,
        required: false,
      },
      popularity: {
        type: Number,
        required: false,
      },
      overview: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
      adult: {
        type: Boolean,
        required: false,
      },
      budget: {
        type: Number,
        required: false,
      },
      release_date: {
        type: String,
        require: false,
      },
      revenue: {
        type: Number,
        required: false,
      },
      backdrop_path: {
        type: String,
        required: false,
        default: null,
      },
      poster_path: {
        type: String,
        required: false,
        default: null,
      },
      runtime: {
        type: Number,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      genre_ids: {
        type: Array,
        required: true,
      },
      tagline: {
        type: String,
        required: false,
      },
      vote_average: {
        type: Number,
        required: false,
      },
      vote_count: {
        type: Number,
        required: false,
      },
      admin_created: {
        type: String,
        required: true,
      },
      admin_id: {
        type: Schema.Types.ObjectId,
        ref: "AdminUsers",
        require: true,
      },
      state_movie: {
        type: String,
        require: true,
      },
      officialTrailer: {
        type: officialTrailerSchema,
        required: false,
        default: null,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  )
);
