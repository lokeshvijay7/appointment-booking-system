import Appointment from "../models/Appointment.js"
import User from "../models/User.js"
import Service from "../models/Service.js"
import { validationResult } from "express-validator"

export const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { userId, serviceId, scheduledAt } = req.body

    const user = await User.findById(userId)
    const service = await Service.findById(serviceId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      })
    }

    // Check for overlapping appointments
    const appointmentDate = new Date(scheduledAt)
    const endTime = new Date(appointmentDate.getTime() + service.duration * 60000)

    const overlapping = await Appointment.findOne({
      scheduledAt: {
        $lt: endTime,
      },
      $expr: {
        $gt: [{ $add: ["$scheduledAt", { $multiply: [{ $toInt: "$serviceId.duration" }, 60000] }] }, appointmentDate],
      },
      status: "scheduled",
    })

    if (overlapping) {
      return res.status(400).json({
        success: false,
        message: "Time slot is already booked",
      })
    }

    const appointment = new Appointment(req.body)
    await appointment.save()

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("userId", "name email")
      .populate("serviceId", "name duration")

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully! ",
      data: populatedAppointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getAppointments = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("serviceId", "name duration")
      .sort({ scheduledAt: 1 })
      .skip(skip)
      .limit(limit)

    const total = await Appointment.countDocuments()

    res.json({
      success: true,
      data: appointments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true })
      .populate("userId", "name email")
      .populate("serviceId", "name duration")

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      })
    }

    res.json({
      success: true,
      message: `Appointment ${status} successfully! `,
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
