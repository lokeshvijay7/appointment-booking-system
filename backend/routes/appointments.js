import express from "express"
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js"
import { validateAppointment } from "../middlewares/validation.js"

const router = express.Router()

router.post("/", validateAppointment, createAppointment)
router.get("/", getAppointments)
router.put("/:id/status", updateAppointmentStatus)

export default router
