import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    titleHi: { type: String, trim: true, default: "" },
    titleUr: { type: String, trim: true, default: "" },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    descriptionHi: { type: String, trim: true, default: "" },
    descriptionUr: { type: String, trim: true, default: "" },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;
