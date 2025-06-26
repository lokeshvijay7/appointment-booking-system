"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { ViewList, CheckCircle, Cancel } from "@mui/icons-material"
import dayjs from "dayjs"
import axios from "axios"

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10,
  })

  useEffect(() => {
    fetchAppointments()
  }, [pagination.current, pagination.limit]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointments?page=${pagination.current}&limit=${pagination.limit}`,
      )
      setAppointments(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to fetch appointments",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, {
        status,
      })
      setMessage({
        type: "success",
        text: `Appointment ${status} successfully!`,
      })
      fetchAppointments()
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update appointment status",
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "primary"
      case "completed":
        return "success"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const handlePageChange = (event, value) => {
    setPagination({ ...pagination, current: value })
  }

  const handleLimitChange = (event) => {
    setPagination({ ...pagination, limit: event.target.value, current: 1 })
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading appointments...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <ViewList sx={{ fontSize: 48, color: "warning.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Appointments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all scheduled appointments
          </Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Total: {pagination.total} appointments</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Per Page</InputLabel>
            <Select value={pagination.limit} onChange={handleLimitChange} label="Per Page">
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey.100" }}>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
                <TableCell>
                  <strong>Service</strong>
                </TableCell>
                <TableCell>
                  <strong>Date & Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {appointment.userId.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {appointment.userId.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{appointment.serviceId.name}</TableCell>
                  <TableCell>{dayjs(appointment.scheduledAt).format("MMM DD, YYYY HH:mm")}</TableCell>
                  <TableCell>{appointment.serviceId.duration} min</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status.toUpperCase()}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {appointment.status === "scheduled" && (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={() => updateAppointmentStatus(appointment._id, "completed")}
                          >
                            Complete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {appointments.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start by booking your first appointment!
            </Typography>
          </Box>
        )}

        {pagination.pages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={pagination.pages}
              page={pagination.current}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default ViewAppointments
