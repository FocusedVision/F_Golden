'use client'

import { useEffect, useState } from 'react'

interface HydrationGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Component to prevent hydration mismatches by only rendering children after hydration
 * Use this for components that depend on browser-only APIs or client-side state
 */
export function HydrationGuard({ children, fallback = null }: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
} 