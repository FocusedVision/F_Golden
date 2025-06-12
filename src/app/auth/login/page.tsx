import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Divider
} from '@mui/material'
import { Login } from '@mui/icons-material'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <Card elevation={3}>
      <CardContent className="p-8">
        {/* Header */}
        <Box className="text-center mb-6">
          <Login className="text-4xl text-blue-600 mb-2" />
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            Welcome Back
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Sign in to your account to continue
          </Typography>
        </Box>

        {/* Login Form */}
        <Box component="form" className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            placeholder="Enter your email"
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            className="mt-6"
          >
            Sign In
          </Button>
        </Box>

        <Divider className="my-6" />

        {/* Footer */}
        <Box className="text-center">
          <Typography variant="body2" className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
} 