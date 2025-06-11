'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  InfoOutlined,
} from '@mui/icons-material';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'flat';
    period?: string;
  };
  progress?: {
    value: number;
    max: number;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  loading?: boolean;
  tooltip?: string;
  badge?: string;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  color = 'primary',
  loading = false,
  tooltip,
  badge,
  onClick,
}: MetricCardProps) {
  const theme = useTheme();

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp sx={{ fontSize: '1rem', color: 'success.main' }} />;
      case 'down':
        return <TrendingDown sx={{ fontSize: '1rem', color: 'error.main' }} />;
      case 'flat':
        return <TrendingFlat sx={{ fontSize: '1rem', color: 'text.secondary' }} />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text.secondary';
    
    switch (trend.direction) {
      case 'up':
        return 'success.main';
      case 'down':
        return 'error.main';
      case 'flat':
        return 'text.secondary';
      default:
        return 'text.secondary';
    }
  };

  const formatTrendValue = (val: number) => {
    const sign = val >= 0 ? '+' : '';
    return `${sign}${val.toFixed(1)}%`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        } : {},
        position: 'relative',
        overflow: 'visible',
      }}
      onClick={onClick}
    >
      {badge && (
        <Chip
          label={badge}
          size="small"
          color={color}
          sx={{
            position: 'absolute',
            top: -8,
            right: 16,
            zIndex: 1,
            fontSize: '0.75rem',
          }}
        />
      )}
      
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}
            >
              {title}
            </Typography>
            {tooltip && (
              <Tooltip title={tooltip} arrow>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <InfoOutlined sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: `${color}.50`,
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {/* Value */}
        <Box sx={{ mb: trend || subtitle ? 1 : 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: 48 }}>
              <LinearProgress
                sx={{
                  width: '60%',
                  height: 8,
                  borderRadius: 4,
                }}
              />
            </Box>
          ) : (
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
          )}
        </Box>

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {/* Trend */}
        {trend && !loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {getTrendIcon()}
            <Typography
              variant="body2"
              sx={{
                color: getTrendColor(),
                fontWeight: 600,
              }}
            >
              {formatTrendValue(trend.value)}
            </Typography>
            {trend.period && (
              <Typography variant="body2" color="text.secondary">
                {trend.period}
              </Typography>
            )}
          </Box>
        )}

        {/* Progress */}
        {progress && !loading && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round((progress.value / progress.max) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(progress.value / progress.max) * 100}
              color={progress.color || color}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'action.hover',
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 