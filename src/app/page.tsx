import { Container, Typography, Box, Chip, Stack } from '@mui/material'
import Counter from '@/components/Counter'

export default function Home() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" component="h1" className="mb-4 font-bold text-gray-800">
          Welcome to Your Frontend Stack
        </Typography>
        
        <Typography variant="h6" className="mb-6 text-gray-600">
          A modern React.js application built with cutting-edge technologies
        </Typography>

        <Stack direction="row" spacing={2} className="justify-center flex-wrap gap-2 mb-8">
          <Chip label="Next.js" color="primary" variant="outlined" />
          <Chip label="React.js" color="primary" variant="outlined" />
          <Chip label="TypeScript" color="secondary" variant="outlined" />
          <Chip label="Material UI" color="primary" variant="outlined" />
          <Chip label="Tailwind CSS" color="secondary" variant="outlined" />
          <Chip label="Redux Toolkit" color="primary" variant="outlined" />
        </Stack>

        <Typography variant="body1" className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          This application demonstrates the seamless integration of Next.js for SEO optimization, 
          Material UI for beautiful components, Tailwind CSS for utility-first styling, 
          and Redux Toolkit for powerful state management.
        </Typography>
      </Box>

      <Counter />

      <Box className="mt-12 text-center">
        <Typography variant="h5" className="mb-4 text-gray-800">
          Ready to Build Something Amazing?
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          Your development environment is set up and ready to go. 
          Start building your next great application!
        </Typography>
      </Box>
    </Container>
  )
}
