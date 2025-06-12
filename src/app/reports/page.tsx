import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material'
import { 
  Assessment, 
  TrendingUp, 
  Download, 
  Visibility,
  FileDownload
} from '@mui/icons-material'

export default function ReportsPage() {
  const reports = [
    { id: 1, name: 'Monthly Sales Report', type: 'Sales', date: '2024-01-31', status: 'Ready', size: '2.4 MB' },
    { id: 2, name: 'User Activity Analysis', type: 'Analytics', date: '2024-01-30', status: 'Processing', size: '1.8 MB' },
    { id: 3, name: 'Financial Summary Q1', type: 'Financial', date: '2024-01-29', status: 'Ready', size: '3.1 MB' },
    { id: 4, name: 'Traffic Analytics', type: 'Analytics', date: '2024-01-28', status: 'Ready', size: '950 KB' },
    { id: 5, name: 'Inventory Report', type: 'Inventory', date: '2024-01-27', status: 'Failed', size: '0 MB' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'success'
      case 'Processing': return 'warning'
      case 'Failed': return 'error'
      default: return 'default'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sales': return 'primary'
      case 'Analytics': return 'secondary'
      case 'Financial': return 'error'
      case 'Inventory': return 'warning'
      default: return 'default'
    }
  }

  return (
    <Container maxWidth="xl" className="py-6">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Box className="flex items-center">
          <Assessment className="mr-3 text-blue-600" />
          <Box>
            <Typography variant="h4" component="h1" className="font-bold text-gray-800">
              Reports
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Generate and manage your business reports
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<TrendingUp />}
          className="whitespace-nowrap"
        >
          Generate Report
        </Button>
      </Box>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-green-600">
              {reports.filter(r => r.status === 'Ready').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Ready Reports
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-orange-600">
              {reports.filter(r => r.status === 'Processing').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Processing
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-blue-600">
              {reports.length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Total Reports
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-red-600">
              {reports.filter(r => r.status === 'Failed').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Failed
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <Box className="p-4 border-b">
          <Typography variant="h6" className="font-semibold">
            Report History
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date Generated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body2" className="font-medium">
                      {report.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={report.type} 
                      size="small"
                      color={getTypeColor(report.type) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {report.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={report.status} 
                      size="small"
                      color={getStatusColor(report.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {report.size}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button 
                      size="small" 
                      startIcon={<Visibility />}
                      className="mr-2"
                      disabled={report.status !== 'Ready'}
                    >
                      View
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<FileDownload />}
                      disabled={report.status !== 'Ready'}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  )
} 