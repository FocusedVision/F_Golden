'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useMemo, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme: themeMode, density } = useSelector((state: RootState) => state.ui);
  const [mounted, setMounted] = useState(false);
  
  // Get facility branding if available
  const selectedFacility = useSelector((state: RootState) => 
    state.auth.user?.facilities?.[0] // For now, use first facility
  );

  // Prevent hydration mismatch by ensuring client-side only theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(() => {
    // Always default to light mode during SSR to prevent hydration mismatch
    let isDark = false;
    
    if (mounted) {
      isDark = themeMode === 'dark' || 
        (themeMode === 'system' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      // During SSR, always use light mode
      isDark = themeMode === 'dark';
    }

    // Base spacing based on density
    const spacingMultiplier = density === 'compact' ? 0.75 : density === 'spacious' ? 1.25 : 1;

    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: '#2196f3',
          light: '#64b5f6',
          dark: '#1976d2',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#e91e63',
          light: '#f06292',
          dark: '#c2185b',
          contrastText: '#ffffff',
        },
        success: {
          main: '#4caf50',
          light: '#81c784',
          dark: '#388e3c',
        },
        warning: {
          main: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        error: {
          main: '#f44336',
          light: '#ef5350',
          dark: '#d32f2f',
        },
        background: {
          default: isDark ? '#0f172a' : '#f8fafc',
          paper: isDark ? '#1e293b' : '#ffffff',
        },
        grey: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      typography: {
        fontFamily: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1.2,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
          lineHeight: 1.3,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
          lineHeight: 1.3,
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h6: {
          fontSize: '1.125rem',
          fontWeight: 600,
          lineHeight: 1.5,
        },
        body1: {
          fontSize: '1rem',
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
        caption: {
          fontSize: '0.75rem',
          lineHeight: 1.4,
        },
      },
      spacing: (factor: number) => `${0.25 * factor * spacingMultiplier}rem`,
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarColor: isDark ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                width: 8,
                height: 8,
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                backgroundColor: isDark ? '#475569' : '#cbd5e1',
                '&:hover': {
                  backgroundColor: isDark ? '#64748b' : '#94a3b8',
                },
              },
              '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              color: isDark ? '#f8fafc' : '#1e293b',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderRight: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 8,
              padding: `${8 * spacingMultiplier}px ${16 * spacingMultiplier}px`,
            },
            containedPrimary: {
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 500,
            },
            colorSuccess: {
              backgroundColor: '#dcfce7',
              color: '#166534',
            },
            colorWarning: {
              backgroundColor: '#fef3c7',
              color: '#92400e',
            },
            colorError: {
              backgroundColor: '#fee2e2',
              color: '#991b1b',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: isDark ? '#475569' : '#cbd5e1',
                },
                '&:hover fieldset': {
                  borderColor: isDark ? '#64748b' : '#94a3b8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                },
              },
            },
          },
        },
      },
    });
  }, [themeMode, density, selectedFacility, mounted]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
} 