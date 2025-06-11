'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  StarRateOutlined,
  CampaignOutlined,
  BusinessOutlined,
  TrendingUpOutlined,
  MessageOutlined,
  RefreshOutlined,
  VisibilityOutlined,
  ThumbUpOutlined,
  EmailOutlined,
  SmsOutlined,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setPageTitle, setBreadcrumbs, addNotification } from '@/lib/store/slices/uiSlice';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/dashboard/MetricCard';

// Mock data for demonstration
const mockMetrics = {
  totalReviews: {
    value: 1247,
    trend: { value: 12.5, direction: 'up' as const, period: 'vs last month' },
  },
  averageRating: {
    value: '4.6',
    trend: { value: 0.3, direction: 'up' as const, period: 'vs last month' },
  },
  activeCampaigns: {
    value: 8,
    trend: { value: -2.1, direction: 'down' as const, period: 'vs last month' },
  },
  responseRate: {
    value: '73%',
    trend: { value: 5.2, direction: 'up' as const, period: 'vs last month' },
    progress: { value: 73, max: 100 },
  },
  totalSent: {
    value: 2156,
    trend: { value: 18.3, direction: 'up' as const, period: 'this month' },
  },
  conversationRate: {
    value: '45%',
    trend: { value: 3.1, direction: 'up' as const, period: 'vs last month' },
    progress: { value: 45, max: 100 },
  },
};

const recentActivity = [
  {
    id: 1,
    type: 'review',
    title: 'New 5-star review received',
    facility: 'Grand Hotel Downtown',
    timestamp: '2 minutes ago',
    status: 'positive',
  },
  {
    id: 2,
    type: 'campaign',
    title: 'Campaign "Summer Feedback" completed',
    facility: 'Seaside Resort',
    timestamp: '15 minutes ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'response',
    title: 'Customer responded to SMS invitation',
    facility: 'City Center Inn',
    timestamp: '1 hour ago',
    status: 'positive',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Low response rate detected',
    facility: 'Mountain Lodge',
    timestamp: '2 hours ago',
    status: 'warning',
  },
];

export default function DashboardPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
    dispatch(setBreadcrumbs([
      { label: 'Home', href: '/dashboard', current: true },
    ]));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(addNotification({
      type: 'info',
      title: 'Refreshing Data',
      message: 'Dashboard metrics are being updated...',
      duration: 3000,
    }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <StarRateOutlined sx={{ fontSize: '1.2rem' }} />;
      case 'campaign':
        return <CampaignOutlined sx={{ fontSize: '1.2rem' }} />;
      case 'response':
        return <MessageOutlined sx={{ fontSize: '1.2rem' }} />;
      case 'alert':
        return <TrendingUpOutlined sx={{ fontSize: '1.2rem' }} />;
      default:
        return <VisibilityOutlined sx={{ fontSize: '1.2rem' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive':
        return 'success';
      case 'warning':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Layout title="Dashboard">
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome back! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your review campaigns today.
            </Typography>
          </Box>
          
          <IconButton
            onClick={handleRefresh}
            sx={{
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <RefreshOutlined />
          </IconButton>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <MetricCard
              title="Total Reviews"
              value={mockMetrics.totalReviews.value}
              icon={<StarRateOutlined />}
              trend={mockMetrics.totalReviews.trend}
              color="primary"
              tooltip="Total number of reviews collected across all facilities"
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <MetricCard
              title="Average Rating"
              value={mockMetrics.averageRating.value}
              icon={<ThumbUpOutlined />}
              trend={mockMetrics.averageRating.trend}
              color="success"
              tooltip="Average star rating across all reviews"
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <MetricCard
              title="Active Campaigns"
              value={mockMetrics.activeCampaigns.value}
              icon={<CampaignOutlined />}
              trend={mockMetrics.activeCampaigns.trend}
              color="info"
              tooltip="Number of currently running review campaigns"
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <MetricCard
              title="Response Rate"
              value={mockMetrics.responseRate.value}
              icon={<MessageOutlined />}
              trend={mockMetrics.responseRate.trend}
              progress={mockMetrics.responseRate.progress}
              color="warning"
              tooltip="Percentage of customers who respond to review invitations"
            />
          </Grid>
        </Grid>

        {/* Secondary Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <MetricCard
              title="Messages Sent"
              value={mockMetrics.totalSent.value}
              subtitle="SMS & Email combined"
              icon={<SmsOutlined />}
              trend={mockMetrics.totalSent.trend}
              color="secondary"
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <MetricCard
              title="Conversion Rate"
              value={mockMetrics.conversationRate.value}
              subtitle="Invitations to completed reviews"
              icon={<EmailOutlined />}
              trend={mockMetrics.conversationRate.trend}
              progress={mockMetrics.conversationRate.progress}
              color="primary"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityOutlined />}
                  >
                    View All
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentActivity.map((activity) => (
                    <Box
                      key={activity.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'background.default',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: `${getStatusColor(activity.status)}.50`,
                          color: `${getStatusColor(activity.status)}.main`,
                        }}
                      >
                        {getActivityIcon(activity.type)}
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.facility} • {activity.timestamp}
                        </Typography>
                      </Box>
                      
                      <Chip
                        label={activity.status}
                        size="small"
                        color={getStatusColor(activity.status) as any}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Quick Actions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<CampaignOutlined />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Create New Campaign
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<BusinessOutlined />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add Facility
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<StarRateOutlined />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    View All Reviews
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<TrendingUpOutlined />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Analytics Dashboard
                  </Button>
                </Box>

                <Box sx={{ mt: 4, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    💡 Pro Tip
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Set up automated follow-up campaigns to increase your response rates by up to 40%.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
} 