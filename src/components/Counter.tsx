'use client'

import React from 'react'
import { Button, Card, CardContent, Typography, Box } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { increment, decrement, incrementByAmount } from '@/lib/features/counterSlice'

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardContent className="text-center p-6">
        <Typography variant="h4" component="h2" className="mb-4 text-gray-800">
          Counter Demo
        </Typography>
        
        <Box className="mb-6">
          <Typography variant="h2" className="font-bold text-blue-600">
            {count}
          </Typography>
        </Box>

        <Box className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Remove />}
            onClick={() => dispatch(decrement())}
            className="min-w-[120px]"
          >
            Decrement
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={() => dispatch(increment())}
            className="min-w-[120px]"
          >
            Increment
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch(incrementByAmount(5))}
            className="min-w-[120px] border-2 hover:border-blue-600"
          >
            Add 5
          </Button>
        </Box>

        <Typography variant="body2" className="mt-4 text-gray-600">
          This demo showcases Material UI components styled with Tailwind CSS and Redux state management.
        </Typography>
      </CardContent>
    </Card>
  )
} 