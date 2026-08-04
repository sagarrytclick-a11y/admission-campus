import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    country_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cityImage: {
      type: String,
      default: '',
    },
    features: [{
      type: String,
    }],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.City || mongoose.model("City", CitySchema);
