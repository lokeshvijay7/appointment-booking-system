"use client"
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // useTheme,
  // useMediaQuery,
  Chip
} from "@mui/material"
import { 
  CalendarMonth, 
  PersonAdd, 
  AddBusiness, 
  BookOnline, 
  ViewList,
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: "Register User", path: "/register-user", icon: <PersonAdd />, color: "#4f46e5" },
    { label: "Create Service", path: "/create-service", icon: <AddBusiness />, color: "#059669" },
    { label: "Book Appointment", path: "/book-appointment", icon: <BookOnline />, color: "#dc2626" },
    { label: "View Appointments", path: "/appointments", icon: <ViewList />, color: "#7c3aed" },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'grey.50' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'grey.200'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="bold" color="primary">
            BookEasy
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: location.pathname === item.path ? 'primary.50' : 'transparent',
              border: location.pathname === item.path ? '1px solid' : 'none',
              borderColor: location.pathname === item.path ? 'primary.200' : 'transparent',
              '&:hover': {
                bgcolor: 'primary.50',
                transform: 'translateX(4px)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
                color: location.pathname === item.path ? 'primary.main' : 'text.primary'
              }}
            />
            {location.pathname === item.path && (
              <Chip size="small" label="Active" color="primary" variant="outlined" />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 2,
                  p: 1,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => navigate("/")}
              >
                <CalendarMonth sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
                onClick={() => navigate("/")}
              >
                BookEasy
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  variant={location.pathname === item.path ? "contained" : "text"}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: location.pathname === item.path ? 'white' : 'grey.700',
                    bgcolor: location.pathname === item.path ? item.color : 'transparent',
                    border: location.pathname === item.path ? 'none' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: location.pathname === item.path ? item.color : 'grey.50',
                      transform: 'translateY(-1px)',
                      boxShadow: location.pathname === item.path 
                        ? '0 4px 12px rgba(0,0,0,0.15)' 
                        : '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease'
                    },
                    '& .MuiButton-startIcon': {
                      color: location.pathname === item.path ? 'white' : item.color
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' },
                ml: 'auto',
                bgcolor: 'primary.50',
                '&:hover': {
                  bgcolor: 'primary.100'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar