"use client"
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Paper } from "@mui/material"
import { PersonAdd, AddBusiness, BookOnline, ViewList, Schedule, People } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: "Register Users",
      description: "Add new users to the system with their basic information",
      icon: <PersonAdd fontSize="large" color="primary" />,
      path: "/register-user",
      color: "#e3f2fd",
    },
    {
      title: "Create Services",
      description: "Define services with duration and descriptions",
      icon: <AddBusiness fontSize="large" color="secondary" />,
      path: "/create-service",
      color: "#fce4ec",
    },
    {
      title: "Book Appointments",
      description: "Schedule appointments for users with available services",
      icon: <BookOnline fontSize="large" color="success" />,
      path: "/book-appointment",
      color: "#e8f5e8",
    },
    {
      title: "View Appointments",
      description: "Manage and track all scheduled appointments",
      icon: <ViewList fontSize="large" color="warning" />,
      path: "/appointments",
      color: "#fff3e0",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 6,
          mb: 6,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Schedule sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Welcome to BookEasy
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Your complete appointment booking solution
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto", opacity: 0.8 }}>
          Streamline your appointment management with our easy-to-use system. Register users, create services, and
          manage bookings all in one place.
        </Typography>
      </Paper>

      {/* Features Grid */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Get Started
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2, maxWidth: 900 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      backgroundColor: feature.color,
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button variant="contained" onClick={() => navigate(feature.path)} sx={{ borderRadius: 2 }}>
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Paper elevation={2} sx={{ mt: 6, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom textAlign="center" fontWeight="bold">
          Why Choose BookEasy?
        </Typography>
        <Grid container spacing={8} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4} textAlign="center">
            <People sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Easy User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simple and intuitive user registration process
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Schedule sx={{ fontSize: 40, color: "secondary.main", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Smart Scheduling
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prevent conflicts with intelligent time slot management
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <ViewList sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Complete Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track and manage all appointments in one place
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Home
