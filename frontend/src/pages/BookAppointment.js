"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { BookOnline } from "@mui/icons-material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import dayjs from "dayjs"
import axios from "axios"

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    scheduledAt: dayjs().add(1, "hour"),
    notes: "",
  })
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    fetchUsers()
    fetchServices()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://appointment-booking-system-backend-aa4o.onrender.com/api/users")
      setUsers(response.data.data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://appointment-booking-system-backend-aa4o.onrender.com/api/services")
      setServices(response.data.data)
    } catch (error) {
      console.error("Failed to fetch services:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      scheduledAt: newValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await axios.post("https://appointment-booking-system-backend-aa4o.onrender.com/api/appointments", {
        ...formData,
        scheduledAt: formData.scheduledAt.toISOString(),
      })
      setMessage({ type: "success", text: response.data.message })
      setFormData({
        userId: "",
        serviceId: "",
        scheduledAt: dayjs().add(1, "hour"),
        notes: "",
      })
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to book appointment",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <BookOnline sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Book Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Schedule a new appointment for a user
          </Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Select User</InputLabel>
            <Select name="userId" value={formData.userId} onChange={handleChange} required label="Select User">
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Select Service</InputLabel>
            <Select name="serviceId" value={formData.serviceId} onChange={handleChange} required label="Select Service">
              {services.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name} ({service.duration} min)
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DateTimePicker
            label="Appointment Date & Time"
            value={formData.scheduledAt}
            onChange={handleDateChange}
            minDateTime={dayjs()}
            sx={{ width: "100%", mb: 2 }}
          />

          <TextField
            fullWidth
            label="Notes (Optional)"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Book Appointment"}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default BookAppointment
