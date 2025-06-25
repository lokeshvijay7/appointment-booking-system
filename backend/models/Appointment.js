import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },
    scheduledAt: {
      type: Date,
      required: [true, "Scheduled time is required"],
      validate: {
        validator: (date) => date > new Date(),
        message: "Appointment must be scheduled for a future date",
      },
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot exceed 300 characters"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Appointment", appointmentSchema)
