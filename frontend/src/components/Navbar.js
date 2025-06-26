"use client"
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material"
import { CalendarMonth, PersonAdd, AddBusiness, BookOnline, ViewList } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: "Register User", path: "/register-user", icon: <PersonAdd /> },
    { label: "Create Service", path: "/create-service", icon: <AddBusiness /> },
    { label: "Book Appointment", path: "/book-appointment", icon: <BookOnline /> },
    { label: "View Appointments", path: "/appointments", icon: <ViewList /> },
  ]

  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar>
          <CalendarMonth sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            BookEasy
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  backgroundColor: location.pathname === item.path ? "rgba(255,255,255,0.1)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
