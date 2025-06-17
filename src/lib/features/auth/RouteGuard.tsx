"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { routeConfigs } from "@/config/navigation";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Simulate auth check - replace with your actual auth logic
  const isAuthenticated = true; // This would come from your auth state
  const userRoles = ["admin", "manager"]; // This would come from your auth state

  // Find current route config
  const currentRoute = routeConfigs.find((config) => config.path === pathname);

  // Check if route requires authentication
  if (currentRoute?.requiresAuth && !isAuthenticated) {
    // Redirect to login page
    router.push("/auth/login");
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  // Check if user has required roles
  if (currentRoute?.roles && currentRoute.roles.length > 0) {
    const hasRequiredRole = currentRoute.roles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <Box className="flex flex-col items-center justify-center min-h-screen">
          <Typography variant="h4" className="mb-4 text-red-600">
            Access Denied
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            You don&apos;t have permission to access this page.
          </Typography>
        </Box>
      );
    }
  }

  return <>{children}</>;
}
