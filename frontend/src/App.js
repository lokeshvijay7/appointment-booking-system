import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import RegisterUser from "./pages/RegisterUser"
// import CreateService from "./pages/CreateService"
import BookAppointment from "./pages/BookAppointment"
// import ViewAppointments from "./pages/ViewAppointments"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register-user" element={<RegisterUser />} />
              {/* <Route path="/create-service" element={<CreateService />} /> */}
              <Route path="/book-appointment" element={<BookAppointment />} />
              {/* <Route path="/appointments" element={<ViewAppointments />} /> */}
            </Routes>
          </div>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
