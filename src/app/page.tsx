import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Paper
} from '@mui/material'
import { 
  Dashboard as DashboardIcon,
  TrendingUp,
  People,
  ShoppingCart,
  Assessment
} from '@mui/icons-material'

export default function DashboardPage() {
  const stats = [
    { title: 'Total Users', value: '12,543', icon: People, color: 'bg-blue-500' },
    { title: 'Revenue', value: '$45,231', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Orders', value: '1,423', icon: ShoppingCart, color: 'bg-orange-500' },
    { title: 'Analytics', value: '98.5%', icon: Assessment, color: 'bg-purple-500' },
  ]

  return (
    <Container maxWidth="xl" className="py-6">
      {/* Header */}
      <Box className="flex items-center mb-6">
        <DashboardIcon className="mr-3 text-gray-600" />
        <Typography variant="h4" component="h1" className="font-bold text-gray-800">
          Dashboard Overview
        </Typography>
      </Box>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="h-full shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" className="font-bold text-gray-800">
                    {stat.value}
                  </Typography>
                </Box>
                <Box className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="text-white text-2xl" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart Area */}
        <div className="lg:col-span-2">
          <Paper className="p-6 h-96">
            <Typography variant="h6" className="mb-4 font-semibold">
              Analytics Overview
            </Typography>
            <Box className="h-full flex items-center justify-center bg-gray-50 rounded">
              <Typography variant="body1" className="text-gray-500">
                Chart component will go here
              </Typography>
            </Box>
          </Paper>
        </div>

        {/* Side Panel */}
        <div>
          <Paper className="p-6 h-96">
            <Typography variant="h6" className="mb-4 font-semibold">
              Recent Activity
            </Typography>
            <Box className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} className="flex items-center p-3 bg-gray-50 rounded">
                  <Box className="w-3 h-3 bg-blue-500 rounded-full mr-3"></Box>
                  <Box>
                    <Typography variant="body2" className="font-medium">
                      Activity {item}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      2 minutes ago
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </div>
      </div>

      {/* Additional Content */}
      <Paper className="p-6">
        <Typography variant="h6" className="mb-4 font-semibold">
          Data Table
        </Typography>
        <Box className="overflow-x-auto">
          <Box className="min-w-full bg-gray-50 rounded p-8 text-center">
            <Typography variant="body1" className="text-gray-500">
              Data table component will go here
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
