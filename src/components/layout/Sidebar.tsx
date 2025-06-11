'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  DashboardOutlined,
  BusinessOutlined,
  CampaignOutlined,
  AnalyticsOutlined,
  PeopleOutlined,
  SettingsOutlined,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  StarRateOutlined,
  MessageOutlined,
  IntegrationInstructionsOutlined,
  PaletteOutlined,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setSidebarOpen, setSidebarCollapsed } from '@/lib/store/slices/uiSlice';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string | number;
  children?: MenuItem[];
  roles?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },
  {
    id: 'facilities',
    label: 'Facilities',
    icon: <BusinessOutlined />,
    path: '/facilities',
    children: [
      {
        id: 'facilities-list',
        label: 'All Facilities',
        icon: <BusinessOutlined />,
        path: '/facilities',
      },
      {
        id: 'facilities-branding',
        label: 'Branding',
        icon: <PaletteOutlined />,
        path: '/facilities/branding',
      },
      {
        id: 'facilities-settings',
        label: 'Settings',
        icon: <SettingsOutlined />,
        path: '/facilities/settings',
      },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <CampaignOutlined />,
    path: '/campaigns',
    children: [
      {
        id: 'campaigns-list',
        label: 'All Campaigns',
        icon: <CampaignOutlined />,
        path: '/campaigns',
      },
      {
        id: 'campaigns-create',
        label: 'Create Campaign',
        icon: <CampaignOutlined />,
        path: '/campaigns/create',
      },
    ],
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: <StarRateOutlined />,
    path: '/reviews',
    children: [
      {
        id: 'reviews-list',
        label: 'All Reviews',
        icon: <StarRateOutlined />,
        path: '/reviews',
      },
      {
        id: 'reviews-responses',
        label: 'Response Templates',
        icon: <MessageOutlined />,
        path: '/reviews/responses',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsOutlined />,
    path: '/analytics',
    children: [
      {
        id: 'analytics-overview',
        label: 'Overview',
        icon: <AnalyticsOutlined />,
        path: '/analytics',
      },
      {
        id: 'analytics-campaigns',
        label: 'Campaign Performance',
        icon: <CampaignOutlined />,
        path: '/analytics/campaigns',
      },
      {
        id: 'analytics-facilities',
        label: 'Facility Performance',
        icon: <BusinessOutlined />,
        path: '/analytics/facilities',
      },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <IntegrationInstructionsOutlined />,
    path: '/integrations',
    roles: ['admin', 'manager'],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <PeopleOutlined />,
    path: '/users',
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsOutlined />,
    path: '/settings',
  },
];

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 64;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: false, // Default to desktop during SSR
    noSsr: true // Suppress hydration warning
  });
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { sidebarOpen, sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const isCollapsed = sidebarCollapsed && !isMobile;
  const drawerWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      const isExpanded = expandedItems.includes(item.id);
      if (isExpanded) {
        setExpandedItems(expandedItems.filter(id => id !== item.id));
      } else {
        setExpandedItems([...expandedItems, item.id]);
      }
    } else {
      router.push(item.path);
      if (isMobile) {
        dispatch(setSidebarOpen(false));
      }
    }
  };

  const handleCollapse = () => {
    dispatch(setSidebarCollapsed(!sidebarCollapsed));
  };

  const isItemActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const canAccessItem = (item: MenuItem) => {
    if (!item.roles || !user) return true;
    return item.roles.includes(user.role);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    if (!canAccessItem(item)) return null;

    const isActive = isItemActive(item.path);
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? 'center' : 'initial',
              px: 2.5,
              py: 1,
              pl: level > 0 ? 4 : 2.5,
              backgroundColor: isActive ? 'action.selected' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 3,
                justifyContent: 'center',
                color: isActive ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            
            {!isCollapsed && (
              <>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: isCollapsed ? 0 : 1,
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'primary.main' : 'text.primary',
                    },
                  }}
                />
                
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    color="primary"
                    sx={{ 
                      height: 20, 
                      fontSize: '0.75rem',
                      mr: hasChildren ? 1 : 0,
                    }}
                  />
                )}
                
                {hasChildren && (
                  isExpanded ? <ExpandLess /> : <ExpandMore />
                )}
              </>
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && !isCollapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          px: isCollapsed ? 1 : 2,
          py: 2,
          minHeight: 64,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {!isCollapsed && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ReviewFlow
          </Typography>
        )}
        
        {!isMobile && (
          <IconButton
            onClick={handleCollapse}
            size="small"
            sx={{
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ChevronLeft
              sx={{
                transform: isCollapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
          </IconButton>
        )}
      </Box>

      {/* User Facility Info */}
      {!isCollapsed && user && user.facilities.length > 0 && (
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Active Facilities
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5 }}>
            {user.facilities.length === 1 ? '1 Facility' : `${user.facilities.length} Facilities`}
          </Typography>
        </Box>
      )}

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 1 }}>
        <List>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Footer */}
      {!isCollapsed && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            ReviewFlow v1.0.0
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? sidebarOpen : true}
      onClose={() => dispatch(setSidebarOpen(false))}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      {drawer}
    </Drawer>
  );
} 