import Service from "../models/Service.js"
import { validationResult } from "express-validator"

export const createService = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const service = new Service(req.body)
    await service.save()

    res.status(201).json({
      success: true,
      message: "Service created successfully! ✨",
      data: service,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      data: services,
      count: services.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
