'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
  DarkMode
} from '@mui/icons-material'
import { Sidebar } from '@/components/layout/dashboard/Sidebar'
import { RouteGuard } from '@/components/features/auth/RouteGuard'

const SIDEBAR_WIDTH = 280
const SIDEBAR_COLLAPSED_WIDTH = 80

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Initialize sidebar state based on screen size
  useEffect(() => {
    setIsHydrated(true)
    if (isMobile) {
      setSidebarOpen(false)
      setSidebarCollapsed(false)
    } else {
      setSidebarOpen(true)
      setSidebarCollapsed(false)
    }
  }, [isMobile])

  const handleSidebarToggle = () => {
    if (isMobile) {
      // On mobile, toggle open/close
      setSidebarOpen(prev => !prev)
    } else {
      // On desktop, toggle collapsed/expanded
      if (sidebarOpen) {
        setSidebarCollapsed(prev => !prev)
      } else {
        setSidebarOpen(true)
        setSidebarCollapsed(false)
      }
    }
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  // Calculate current sidebar width
  const currentSidebarWidth = isMobile 
    ? SIDEBAR_WIDTH 
    : sidebarCollapsed 
      ? SIDEBAR_COLLAPSED_WIDTH 
      : SIDEBAR_WIDTH

  return (
    <RouteGuard>
      <Box 
        sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        {/* Sidebar */}
        <Sidebar 
          open={isHydrated ? sidebarOpen : false}
          collapsed={isHydrated ? sidebarCollapsed : false}
          onClose={handleSidebarClose}
          permanent={!isMobile}
          isMobile={isMobile}
        />

        {/* Main Content Area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0a0a',
            minHeight: '100vh',
            width: {
              xs: '100%',
              md: sidebarOpen && !isMobile 
                ? `calc(100vw - ${currentSidebarWidth}px)` 
                : '100%'
            },
          
            transition: theme.transitions.create(['margin-left', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            position: 'relative',
          }}
        >
          {/* Top App Bar */}
          <AppBar 
            position="sticky" 
            elevation={0}
            sx={{ 
              backgroundColor: '#1a1a1a',
              borderBottom: '1px solid #333',
              zIndex: theme.zIndex.drawer - 1,
              width: '100%'
            }}
          >
            <Toolbar>
              {/* Menu Button */}
              <IconButton
                edge="start"
                onClick={handleSidebarToggle}
                sx={{ 
                  mr: 2, 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Title */}
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  flexGrow: 1, 
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                Dashboard
              </Typography>

              {/* Right Side Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Notifications */}
                <IconButton 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { color: 'white' }
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                {/* Theme Toggle */}
                <IconButton 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { color: 'white' }
                  }}
                >
                  <DarkMode />
                </IconButton>

                {/* Profile Menu */}
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ 
                    ml: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#F5C451' }}>
                    A
                  </Avatar>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                color: 'white'
              }
            }}
          >
            <MenuItem sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <MenuItem sx={{ '&:hover': { backgroundColor: '#333' } }}>
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>

          {/* Page Content */}
          <Box 
            sx={{ 
              flexGrow: 1,
              overflow: 'auto',
              width: '100%',
              height: 'calc(100vh - 64px)',
            }}
          >
            {children}
          </Box>
        </Box>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: theme.zIndex.drawer - 1,
            }}
            onClick={handleSidebarClose}
          />
        )}
      </Box>
    </RouteGuard>
  )
} 