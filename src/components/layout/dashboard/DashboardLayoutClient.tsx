'use client'

import React, { useState } from 'react'
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
  LightMode
} from '@mui/icons-material'
import { Sidebar } from '@/components/layout/dashboard/Sidebar'
import { RouteGuard } from '@/components/features/auth/RouteGuard'

const SIDEBAR_WIDTH = 280

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  return (
    <RouteGuard>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          permanent={!isMobile}
        />

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            backgroundColor: 'grey.50',
            minHeight: '100vh',
            ml: !isMobile && sidebarOpen ? 0 : `-${SIDEBAR_WIDTH}px`,
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
        {/* Top App Bar */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            backgroundColor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Toolbar>
            {/* Menu Button */}
            <IconButton
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Title */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                color: 'text.primary',
                fontWeight: 600 
              }}
            >
              Dashboard
            </Typography>

            {/* Right Side Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Notifications */}
              <IconButton sx={{ color: 'text.secondary' }}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {/* Theme Toggle */}
              <IconButton sx={{ color: 'text.secondary' }}>
                <LightMode />
              </IconButton>

              {/* Profile Menu */}
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
        >
          <MenuItem>
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem>
            <Settings sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          <MenuItem>
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        <Box sx={{ p: 3 }}>
          {children}
        </Box>
        </Box>
      </Box>
    </RouteGuard>
  )
} 