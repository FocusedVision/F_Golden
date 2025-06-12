import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Paper
} from '@mui/material'
import { 
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material'
import Image from 'next/image'

export default function DashboardPage() {
  
  const stats = [
    { 
      title: 'Total Reviews', 
      value: '40,689', 
      iconSrc: '/card-icon-1.png', 
      trend: '8.5%',
      trendLabel: 'Up from yesterday',
      trendDirection: 'up',
      iconBg: '#4A90E2'
    },
    { 
      title: 'Conversion rate', 
      value: '92%', 
      iconSrc: '/card-icon-2.png', 
      trend: '1.3%',
      trendLabel: 'Up from yesterday',
      trendDirection: 'up',
      iconBg: '#F5A623'
    },
    { 
      title: 'Delivery Success Rate', 
      value: '89%', 
      iconSrc: '/card-icon-3.png', 
      trend: '4.3%',
      trendLabel: 'Down from yesterday',
      trendDirection: 'down',
      iconBg: '#50C878'
    },
    { 
      title: 'New Reviews', 
      value: '2040', 
      iconSrc: '/card-icon-4.png', 
      trend: '1.8%',
      trendLabel: 'Up from yesterday',
      trendDirection: 'up',
      iconBg: '#E74C3C'
    },
  ]

  return (
    <Container 
      maxWidth={false}
      sx={{
        width: '100%',
        padding: { xs: '16px', sm: '24px', lg: '32px' },
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          marginBottom: { xs: '16px', sm: '24px' },
          width: '100%'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 700,
            color: 'white',
            fontSize: { 
              xs: '1.5rem', 
              sm: '1.75rem', 
              md: '2rem', 
              lg: '2.25rem' 
            }
          }}
        >
          Home
        </Typography>
      </Box>

      {/* Stats Grid - Enhanced responsive layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            xl: 'repeat(4, 1fr)' 
          },
          gap: { xs: 2, sm: 3 },
          marginBottom: { xs: 3, sm: 4 },
          width: '100%'
        }}
      >
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="h-full shadow-md hover:shadow-lg transition-shadow"
            sx={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              borderRadius: 2,
              border: '1px solid #333',
              minHeight: { xs: 'auto', sm: '160px' },
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <CardContent 
              sx={{
                padding: { xs: '16px', sm: '24px' },
                '&:last-child': { 
                  paddingBottom: { xs: '16px', sm: '24px' } 
                },
                boxSizing: 'border-box'
              }}
            >
              <Box>
                {/* Card Header - Responsive layout */}
                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: { xs: '12px', sm: '16px' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    width: '100%'
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#F5C451',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 600,
                        lineHeight: '120%',
                        marginBottom: { xs: '8px', sm: '12px' },
                        wordBreak: 'break-word'
                      }}
                    >
                      {stat.title}
                    </Typography>

                    <Typography 
                      variant="h4" 
                      className="font-bold"
                      sx={{ 
                        color: 'white', 
                        fontWeight: 700,
                        fontSize: { 
                          xs: '1.75rem', 
                          sm: '2rem', 
                          md: '2.25rem', 
                          lg: '2.5rem' 
                        },
                        lineHeight: '120%'
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  {/* Icon - Responsive sizing */}
                  <Box
                    sx={{
                      borderRadius: '50%',
                      width: { xs: 48, sm: 56, md: 60 },
                      height: { xs: 48, sm: 56, md: 60 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={stat.iconSrc}
                      alt={stat.title}
                      width={60}
                      height={60}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                </Box>
              
                {/* Trend Indicator - Responsive layout */}
                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    gap: { xs: '4px', sm: '8px' }
                  }}
                >
                  {stat.trendDirection === 'up' ? (
                    <ArrowUpward 
                      sx={{ 
                        color: '#22c55e', 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        flexShrink: 0
                      }} 
                    />
                  ) : (
                    <ArrowDownward 
                      sx={{ 
                        color: '#ef4444', 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        flexShrink: 0
                      }} 
                    />
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: stat.trendDirection === 'up' ? '#22c55e' : '#ef4444', 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      flexShrink: 0
                    }}
                  >
                    {stat.trend}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      fontWeight: 600,
                      lineHeight: '120%',
                      color: '#FFFFFF',
                      wordBreak: 'break-word'
                    }}
                  >
                    {stat.trendLabel}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Content Grid - Enhanced responsive layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: { xs: 2, sm: 3 },
          marginBottom: { xs: 2, sm: 3 },
          width: '100%'
        }}
      >
        {/* Chart Area */}
        <Box sx={{ width: '100%' }}>
          <Paper 
            sx={{
              padding: { xs: '16px', sm: '24px' },
              height: { xs: '300px', sm: '350px', md: '400px' },
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: '1px solid #333',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Typography 
              variant="h6" 
              className="mb-4 font-semibold"
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                marginBottom: { xs: '12px', sm: '16px' }
              }}
            >
              Analytics Overview
            </Typography>
            {/* Placeholder for chart content */}
            <Box 
              sx={{
                height: 'calc(100% - 40px)',
                backgroundColor: '#2a2a2a',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ color: '#888', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Chart content goes here
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Side Panel */}
        <Box sx={{ width: '100%' }}>
          <Paper 
            sx={{
              padding: { xs: '16px', sm: '24px' },
              height: { xs: '300px', sm: '350px', md: '400px' },
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: '1px solid #333',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Typography 
              variant="h6" 
              className="mb-4 font-semibold"
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                marginBottom: { xs: '12px', sm: '16px' }
              }}
            >
              Recent Activity
            </Typography>
            {/* Placeholder for activity content */}
            <Box 
              sx={{
                height: 'calc(100% - 40px)',
                backgroundColor: '#2a2a2a',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ color: '#888', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Activity content goes here
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Additional Content - Data Table */}
      <Paper 
        sx={{
          padding: { xs: '16px', sm: '24px' },
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: '1px solid #333',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Typography 
          variant="h6" 
          className="mb-4 font-semibold"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
            marginBottom: { xs: '12px', sm: '16px' }
          }}
        >
          Data Table
        </Typography>
        <Box 
          sx={{
            minHeight: { xs: '200px', sm: '250px' },
            backgroundColor: '#2a2a2a',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ color: '#888', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            Table content goes here
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
