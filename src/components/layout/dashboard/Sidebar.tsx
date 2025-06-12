'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Badge,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ExpandLess, ExpandMore, Close } from '@mui/icons-material'
import { navigationItems } from '@/config/navigation'
import { NavItem } from '@/types/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
  permanent?: boolean
}

const SIDEBAR_WIDTH = 280

export function Sidebar({ open, onClose, permanent = false }: SidebarProps) {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [expandedItems, setExpandedItems] = useState<string[]>(['analytics', 'ecommerce', 'settings'])

  const handleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const active = isActive(item.href)

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={hasChildren ? 'div' : Link}
            href={hasChildren ? undefined : item.href}
            onClick={hasChildren ? () => handleExpand(item.id) : undefined}
            sx={{
              minHeight: 48,
              pl: 2 + level * 2,
              backgroundColor: active && !hasChildren ? 'action.selected' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <item.icon sx={{ 
                color: active ? 'primary.main' : 'text.secondary',
                fontSize: 20 
              }} />
            </ListItemIcon>
            
            <ListItemText 
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'primary.main' : 'text.primary',
                }
              }}
            />
            
            {item.badge && (
              <Badge 
                badgeContent={item.badge} 
                color="error" 
                sx={{ mr: hasChildren ? 1 : 0 }}
              />
            )}
            
            {hasChildren && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Admin Panel
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        )}
      </Box>
      
      <Divider />

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List>
          {navigationItems.map(item => renderNavItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Version 1.0.0
        </Typography>
      </Box>
    </Box>
  )

  if (permanent && !isMobile) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
} 