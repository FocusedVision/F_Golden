import { Container, Box } from '@mui/material'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.50'
      }}
    >
      <Container maxWidth="sm">
        {children}
      </Container>
    </Box>
  )
} 