import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import { 
  Add, 
  Search, 
  Edit, 
  Delete, 
  MoreVert,
  FilterList 
} from '@mui/icons-material'

export default function ReviewsPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'J' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', avatar: 'J' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', avatar: 'B' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', avatar: 'A' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'Pending', avatar: 'C' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'error'
      case 'Pending': return 'warning'
      default: return 'default'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'error'
      case 'Manager': return 'warning'
      case 'User': return 'primary'
      default: return 'default'
    }
  }

  return (
    <Container maxWidth="xl" className="py-6">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Box>
          <Typography variant="h4" component="h1" className="mb-2 font-bold text-gray-800">
            User Management
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage user accounts, roles, and permissions
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          className="whitespace-nowrap"
        >
          Add New User
        </Button>
      </Box>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-blue-600">
              {users.length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Total Users
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-green-600">
              {users.filter(u => u.status === 'Active').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Active Users
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-orange-600">
              {users.filter(u => u.role === 'Admin').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Administrators
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Typography variant="h4" className="font-bold text-yellow-600">
              {users.filter(u => u.status === 'Pending').length}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Pending Approval
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent>
          <Box className="flex flex-col sm:flex-row gap-4 items-center">
            <TextField
              placeholder="Search users..."
              variant="outlined"
              size="small"
              className="flex-1"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterList />}
              className="whitespace-nowrap"
            >
              Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.avatar}
                      </Avatar>
                      <Typography variant="body2" className="font-medium">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      size="small"
                      color={getRoleColor(user.role) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      size="small"
                      color={getStatusColor(user.status) as any}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
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