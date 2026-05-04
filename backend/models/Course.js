
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    nameHi: { type: String, trim: true, default: "" },
    nameUr: { type: String, trim: true, default: "" },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    descriptionHi: { type: String, trim: true, default: "" },
    descriptionUr: { type: String, trim: true, default: "" },

    duration: {
      value: {
        type: Number,
        required: [true, "Duration value is required"],
        min: [1, "Minimum 1 hona chahiye"],
      },
      unit: {
        type: String,
        enum: {
          values: ["Days", "Weeks", "Months", "Years"],
          message: "{VALUE} valid unit nahi hai",
        },
        required: [true, "Duration unit is required"],
      },
    },

    level: {
      type: String,
      enum: {
        values: ["Beginners", "Intermediate", "Advanced", "All Ages"],
        message: "{VALUE} valid level nahi hai",
      },
      required: [true, "Level is required"],
      default: "All Ages",
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    image: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },

    totalStudents: {
      type: Number,
      default: 0,
      min: [0, "Students count negative nahi ho sakta"],
    },

    fees: {
      amount: { type: Number, default: 0 },
      isFree: { type: Boolean, default: true },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

CourseSchema.virtual("durationText").get(function () {
  return `${this.duration.value} ${this.duration.unit}`;
});

CourseSchema.set("toJSON", { virtuals: true });
CourseSchema.set("toObject", { virtuals: true });

const Course = mongoose.model("Course", CourseSchema);

export default Course;