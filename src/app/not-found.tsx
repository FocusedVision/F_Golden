"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        gap: 3,
        padding: 3,
        backgroundColor: "#1A1A1A",
      }}
    >
      {/* 404 Error Display */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "8rem",
            fontWeight: "bold",
            color: "#F5C451",
            textShadow: "0 4px 8px rgba(245, 196, 81, 0.3)",
            lineHeight: 1,
            mb: 1,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#FFFFFF",
            fontWeight: 600,
            mb: 1,
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#A1A1AA",
            fontSize: "1.1rem",
            maxWidth: "500px",
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist yet. It might be under
          development or the URL might be incorrect.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        <Link href="/home">
          <Button
            variant="contained"
            startIcon={<Home />}
            sx={{
              backgroundColor: "#F5C451",
              color: "#2A2A2A",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "1rem",
              minWidth: "160px",
              "&:hover": {
                backgroundColor: "#E6B045",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(245, 196, 81, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Go to Home
          </Button>
        </Link>

        <Button
          variant="outlined"
          onClick={handleGoBack}
          startIcon={<ArrowBack />}
          sx={{
            borderColor: "#52525B",
            color: "#FFFFFF",
            fontWeight: 500,
            padding: "12px 24px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "1rem",
            minWidth: "160px",
            "&:hover": {
              borderColor: "#F5C451",
              backgroundColor: "rgba(245, 196, 81, 0.1)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}
