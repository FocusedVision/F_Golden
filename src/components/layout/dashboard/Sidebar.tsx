'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { navigationItems1, navigationItems2, navigationItems3 } from '@/config/navigation'
import { NavItem } from '@/types/navigation'

interface SidebarProps {
  open: boolean
  collapsed?: boolean
  onClose: () => void
  permanent?: boolean
  isMobile?: boolean
}

const SIDEBAR_WIDTH = 280
const SIDEBAR_COLLAPSED_WIDTH = 80

export function Sidebar({ 
  open, 
  collapsed = false, 
  onClose, 
  permanent = false, 
  isMobile = false 
}: SidebarProps) {
  const pathname = usePathname()
  const theme = useTheme()
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const isActive = (href: string) => {
    // Handle root path specifically
    if (href === '/') {
      return pathname === '/'
    }
    // Handle dashboard path specifically
    if (href === '/dashboard') {
      return pathname === href
    }
    // For other paths, check if pathname starts with href and is followed by / or end of string
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const active = isActive(item.href)

    const navItem = (
      <ListItem 
        disablePadding 
        sx={{ 
          display: 'block',
          mb: 0.5
        }}
        key={item.id}
      >
        <ListItemButton
          component={hasChildren ? 'div' : Link}
          href={hasChildren ? undefined : item.href}
          onClick={isMobile ? onClose : undefined}
          sx={{
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1 : 2.5,
            py: 1,
            mx: collapsed ? 1 : 1.5,
            borderRadius: 2,
            backgroundColor: active ? 'rgba(245, 196, 81, 0.15)' : 'transparent',
            border: active ? '1px solid rgba(245, 196, 81, 0.3)' : '1px solid transparent',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            '&:hover': {
              backgroundColor: active 
                ? 'rgba(245, 196, 81, 0.2)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(245, 196, 81, 0.2)',
            },
            '&::before': active ? {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 3,
              height: '60%',
              backgroundColor: '#F5C451',
              borderRadius: '0 2px 2px 0',
            } : {},
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: 0,
              mr: collapsed ? 0 : 2,
              justifyContent: 'center',
            }}
          >
            <item.icon sx={{ 
              color: active ? '#F5C451' : '#FFFFFF',
              fontSize: 20,
              transition: 'color 0.2s ease-in-out',
            }} />
          </ListItemIcon>
          
          {!collapsed && (
            <ListItemText 
              primary={item.label}
              sx={{
                margin: 0,
                opacity: collapsed ? 0 : 1,
                transition: 'opacity 0.2s ease-in-out',
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? '#F5C451' : '#FFFFFF',
                  fontFamily: 'Nunito Sans, sans-serif',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s ease-in-out',
                }
              }}
            />
          )}
          
          {item.badge && !collapsed && (
            <Badge 
              badgeContent={item.badge} 
              color="error" 
              sx={{ 
                '& .MuiBadge-badge': {
                  fontSize: '0.625rem',
                  height: 16,
                  minWidth: 16,
                }
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    )

    // Wrap with tooltip when collapsed
    if (collapsed && !isMobile) {
      return (
        <Tooltip 
          title={item.label} 
          placement="right" 
          key={item.id}
          arrow
          PopperProps={{
            sx: {
              '& .MuiTooltip-tooltip': {
                backgroundColor: '#1a1a1a',
                color: 'white',
                fontSize: '0.875rem',
                border: '1px solid #333',
              },
              '& .MuiTooltip-arrow': {
                color: '#1a1a1a',
                '&::before': {
                  border: '1px solid #333',
                }
              }
            }
          }}
        >
          {navItem}
        </Tooltip>
      )
    }

    return navItem
  }

  const currentWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#2A2A2A',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ 
        p: collapsed ? 1 : 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: 64,
        flexShrink: 0
      }}>
        {!collapsed && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: 1,
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out',
          }}>
            <Image 
              src="/Golden Storage.png" 
              alt="Golden Storage" 
              width={139} 
              height={42}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        
        {collapsed && (
          <Box sx={{ 
            width: 40,
            height: 40,
            backgroundColor: '#F5C451',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#2A2A2A'
          }}>
            G
          </Box>
        )}
        
        {isHydrated && isMobile && (
          <IconButton 
            onClick={onClose} 
            size="small" 
            sx={{ 
              color: '#FFFFFF',
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Navigation Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        py: 1
      }}>
        {/* Primary Navigation */}
        <Box sx={{ mb: 1 }}>
          <List sx={{ py: 0 }}>
            {navigationItems1.map(item => renderNavItem(item))}
          </List>
        </Box>

        <Divider sx={{ 
          borderColor: 'rgba(255, 255, 255, 0.1)',
          mx: collapsed ? 1 : 2,
          my: 1
        }} />

        {/* Secondary Navigation */}
        <Box sx={{ flex: 1, mb: 1 }}>
          <List sx={{ py: 0 }}>
            {navigationItems2.map(item => renderNavItem(item))}
          </List>
        </Box>

        {/* Footer Navigation */}
        <Box>
          <Divider sx={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            mx: collapsed ? 1 : 2,
            mb: 1
          }} />
          <List sx={{ py: 0 }}>
            {navigationItems3.map(item => renderNavItem(item))}
          </List>
        </Box>
      </Box>
    </Box>
  )

  // For desktop - use permanent drawer when not mobile
  if (permanent && isHydrated && !isMobile) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: currentWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#2A2A2A',
            position: 'fixed',
            height: '100vh',
            zIndex: theme.zIndex.drawer,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    )
  }

  // For mobile - use temporary drawer
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#2A2A2A',
          border: 'none',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
} 