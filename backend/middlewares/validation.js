import { body } from "express-validator"

export const validateUser = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
]

export const validateService = [
  body("name").trim().isLength({ min: 3 }).withMessage("Service name must be at least 3 characters long"),
  body("duration").isInt({ min: 15, max: 480 }).withMessage("Duration must be between 15 and 480 minutes"),
]

export const validateAppointment = [
  body("userId").isMongoId().withMessage("Valid user ID is required"),
  body("serviceId").isMongoId().withMessage("Valid service ID is required"),
  body("scheduledAt")
    .isISO8601()
    .withMessage("Valid date and time is required")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Appointment must be scheduled for a future date")
      }
      return true
    }),
]
