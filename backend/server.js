import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import userRoutes from "./routes/users.js"
import serviceRoutes from "./routes/services.js"
import appointmentRoutes from "./routes/appointments.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/appointments", appointmentRoutes)

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Appointment Booking System API is running!",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      services: "/api/services",
      appointments: "/api/appointments",
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

app.listen(PORT, () => {
  console.log(`🎉 Server is running on port ${PORT}`)
  console.log(`📱 API URL: http://localhost:${PORT}`)
})
