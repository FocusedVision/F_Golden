import { Container, Typography, Box, Paper } from '@mui/material'
import { Analytics, TrendingUp, BarChart, PieChart } from '@mui/icons-material'

export default function AnalyticsPage() {
  return (
    <Container maxWidth="xl" className="py-6">
      {/* Header */}
      <Box className="flex items-center mb-6">
        <Analytics className="mr-3 text-blue-600" />
        <Typography variant="h4" component="h1" className="font-bold text-gray-800">
          Analytics Dashboard
        </Typography>
      </Box>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <Paper className="p-6 h-96">
            <Box className="flex items-center mb-4">
              <TrendingUp className="mr-2 text-green-600" />
              <Typography variant="h6" className="font-semibold">
                Traffic Analytics
              </Typography>
            </Box>
            <Box className="h-full flex items-center justify-center bg-gray-50 rounded">
              <Typography variant="body1" className="text-gray-500">
                Line chart component will go here
              </Typography>
            </Box>
          </Paper>
        </div>

        <div>
          <Paper className="p-6 h-96">
            <Box className="flex items-center mb-4">
              <PieChart className="mr-2 text-purple-600" />
              <Typography variant="h6" className="font-semibold">
                User Distribution
              </Typography>
            </Box>
            <Box className="h-full flex items-center justify-center bg-gray-50 rounded">
              <Typography variant="body1" className="text-gray-500">
                Pie chart component will go here
              </Typography>
            </Box>
          </Paper>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Paper className="p-6">
          <Box className="flex items-center mb-4">
            <BarChart className="mr-2 text-orange-600" />
            <Typography variant="h6" className="font-semibold">
              Performance Metrics
            </Typography>
          </Box>
          <Box className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <Typography variant="body1" className="text-gray-500">
              Bar chart component will go here
            </Typography>
          </Box>
        </Paper>

        <Paper className="p-6">
          <Box className="flex items-center mb-4">
            <TrendingUp className="mr-2 text-green-600" />
            <Typography variant="h6" className="font-semibold">
              Revenue Trends
            </Typography>
          </Box>
          <Box className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <Typography variant="body1" className="text-gray-500">
              Trend chart component will go here
            </Typography>
          </Box>
        </Paper>
      </div>
    </Container>
  )
} 