'use client';

import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setScreenSize } from '@/lib/store/slices/uiSlice';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationSystem from '../ui/NotificationSystem';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  
  // Use server-safe defaults for media queries
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: false, // Default to desktop during SSR
    noSsr: true // Suppress hydration warning
  });
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'), {
    defaultMatches: false,
    noSsr: true
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true, // Default to desktop during SSR
    noSsr: true
  });
  
  const { sidebarOpen, sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  // Media query hooks for screen size detection
  const isXs = useMediaQuery(theme.breakpoints.only('xs'), {
    defaultMatches: false,
    noSsr: true
  });
  const isSm = useMediaQuery(theme.breakpoints.only('sm'), {
    defaultMatches: false,
    noSsr: true
  });
  const isMd = useMediaQuery(theme.breakpoints.only('md'), {
    defaultMatches: false,
    noSsr: true
  });
  const isLg = useMediaQuery(theme.breakpoints.only('lg'), {
    defaultMatches: true, // Default to lg during SSR
    noSsr: true
  });
  const isXl = useMediaQuery(theme.breakpoints.only('xl'), {
    defaultMatches: false,
    noSsr: true
  });
  const is2xl = useMediaQuery(theme.breakpoints.up('xl'), {
    defaultMatches: false,
    noSsr: true
  });

  // Track mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle responsive breakpoints
  useEffect(() => {
    // Only update screen size after component is mounted to prevent hydration mismatch
    if (!mounted) return;

    let screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg'; // Default to lg
    
    if (isXs) screenSize = 'xs';
    else if (isSm) screenSize = 'sm';
    else if (isMd) screenSize = 'md';
    else if (isLg) screenSize = 'lg';
    else if (isXl) screenSize = 'xl';
    else if (is2xl) screenSize = '2xl';

    dispatch(setScreenSize({
      isMobile,
      isTablet,
      isDesktop,
      screenSize,
    }));
  }, [mounted, isMobile, isTablet, isDesktop, dispatch, isXs, isSm, isMd, isLg, isXl, is2xl]);

  // Calculate sidebar width for layout
  const getSidebarWidth = () => {
    if (isMobile) return 0; // Hidden on mobile
    if (sidebarCollapsed) return 64;
    return 280;
  };

  const sidebarWidth = getSidebarWidth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Header */}
        <Header title={title} />
        
        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            pt: { xs: 7, sm: 8 }, // Account for fixed header
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)', // Full height minus header
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Notification System */}
      <NotificationSystem />
    </Box>
  );
} 