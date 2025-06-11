'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Breadcrumbs,
  Link,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  AccountCircleOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
  SettingsOutlined,
  LogoutOutlined,
  BusinessOutlined,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { 
  toggleSidebar, 
  setTheme,
  addNotification,
  removeNotification 
} from '@/lib/store/slices/uiSlice';
import { logoutUser } from '@/lib/store/slices/authSlice';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: false, // Default to desktop during SSR
    noSsr: true // Suppress hydration warning
  });
  const dispatch = useDispatch<AppDispatch>();
  
  const { 
    pageTitle, 
    breadcrumbs, 
    notifications, 
    theme: themeMode 
  } = useSelector((state: RootState) => state.ui);
  
  const { user } = useSelector((state: RootState) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleThemeToggle = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    handleUserMenuClose();
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  const displayTitle = title || pageTitle || 'Dashboard';

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {/* Menu Toggle */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle sidebar"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title and Breadcrumbs */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            {displayTitle}
          </Typography>
          
          {breadcrumbs.length > 0 && !isMobile && (
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ 
                fontSize: '0.875rem',
                '& .MuiBreadcrumbs-separator': {
                  mx: 0.5,
                },
              }}
            >
              {breadcrumbs.map((crumb, index) => (
                <Link
                  key={index}
                  color={crumb.current ? "text.primary" : "inherit"}
                  href={crumb.href || '#'}
                  underline={crumb.current ? "none" : "hover"}
                  sx={{ 
                    fontWeight: crumb.current ? 500 : 400,
                    fontSize: 'inherit',
                  }}
                >
                  {crumb.label}
                </Link>
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {/* User Facility Info */}
        {user && user.facilities.length > 0 && !isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <BusinessOutlined sx={{ mr: 1, fontSize: '1.2rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {user.facilities.length === 1 ? '1 Facility' : `${user.facilities.length} Facilities`}
            </Typography>
          </Box>
        )}

        {/* Theme Toggle */}
        <IconButton
          color="inherit"
          onClick={handleThemeToggle}
          aria-label="toggle theme"
          sx={{ mr: 1 }}
        >
          {themeMode === 'dark' ? <Brightness7Outlined /> : <Brightness4Outlined />}
        </IconButton>

        {/* Notifications */}
        <IconButton
          color="inherit"
          onClick={handleNotificationOpen}
          aria-label="notifications"
          sx={{ mr: 1 }}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsOutlined />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <IconButton
          size="large"
          edge="end"
          aria-label="account"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleUserMenuOpen}
          color="inherit"
        >
          {user?.avatar ? (
            <Avatar 
              src={user.avatar} 
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <AccountCircleOutlined />
          )}
        </IconButton>

        {/* User Menu Dropdown */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 240,
              boxShadow: theme.shadows[3],
            },
          }}
        >
          {user && (
            <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Chip 
                label={user.role} 
                size="small" 
                color="primary" 
                sx={{ mt: 0.5, textTransform: 'capitalize' }}
              />
            </Box>
          )}
          
          <MenuItem onClick={handleUserMenuClose}>
            <AccountCircleOutlined sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          
          <MenuItem onClick={handleUserMenuClose}>
            <SettingsOutlined sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutOutlined sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          id="notifications-menu"
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 320,
              maxWidth: 400,
              maxHeight: 400,
              boxShadow: theme.shadows[3],
            },
          }}
        >
          {notifications.length === 0 ? (
            <Box sx={{ px: 2, py: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                sx={{ 
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  py: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {notification.message}
                </Typography>
                <Chip 
                  label={notification.type} 
                  size="small" 
                  color={notification.type === 'error' ? 'error' : 
                        notification.type === 'warning' ? 'warning' : 
                        notification.type === 'success' ? 'success' : 'info'}
                  sx={{ mt: 1, textTransform: 'capitalize' }}
                />
              </MenuItem>
            ))
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
} 