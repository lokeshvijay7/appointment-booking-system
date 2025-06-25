import User from "../models/User.js"
import { validationResult } from "express-validator"

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { name, email } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      })
    }

    const user = new User({ name, email })
    await user.save()

    res.status(201).json({
      success: true,
      message: "User created successfully! 🎉",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      data: users,
      count: users.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
