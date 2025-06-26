"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material"
import { AddBusiness, Schedule } from "@mui/icons-material"
import axios from "axios"

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await axios.post("http://localhost:5000/api/services", {
        ...formData,
        duration: Number.parseInt(formData.duration),
      })
      setMessage({ type: "success", text: response.data.message })
      setFormData({ name: "", duration: "", description: "" })
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to create service",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <AddBusiness sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Create New Service
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Define a new service for appointment booking
          </Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              startAdornment: (
                <InputAdornment position="start">
                  <Schedule />
                </InputAdornment>
              ),
            }}
            inputProps={{ min: 15, max: 480 }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description (Optional)"
            name="description"
            value={formData.description}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Service"}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreateService
