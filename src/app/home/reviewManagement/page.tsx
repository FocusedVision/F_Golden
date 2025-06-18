"use client";
import React, { useState } from "react";
import styles from "./ReviewManagement.module.css";
import FilterDropdown from "@/components/filter/FilterDropdown";
import Table from "@/components/reviewManagement/Table";

const data = [
  {
    date: "2024-01-15",
    facility: "Downtown Storage Center",
    tenant: "John Smith",
    overall_rating: 4.5,
    review:
      "Great facility with excellent security. The staff was very helpful during my move-in process. Clean and well-maintained units.",
    response: "",
  },
  {
    date: "2024-01-14",
    facility: "Metro Storage Solutions",
    tenant: "Sarah Johnson",
    overall_rating: 3.2,
    review:
      "The storage unit was decent but the access hours are limited. Would appreciate more flexible timing for pickup and drop-off.",
    response: "",
  },
  {
    date: "2024-01-13",
    facility: "Prime Storage Facility",
    tenant: "Michael Chen",
    overall_rating: 5.0,
    review:
      "Outstanding service! The online rental process was seamless and the facility is spotless. Highly recommend to anyone needing storage.",
    response: "",
  },
  {
    date: "2024-01-12",
    facility: "SecureStore Warehouse",
    tenant: "Emily Davis",
    overall_rating: 2.8,
    review:
      "The unit had some cleanliness issues when I moved in. Also, the pricing wasn't as competitive as advertised online.",
    response: "",
  },
  {
    date: "2024-01-11",
    facility: "City Center Storage",
    tenant: "Robert Wilson",
    overall_rating: 4.2,
    review:
      "Good location and reasonable prices. The staff could be more responsive to customer inquiries, but overall satisfied with the service.",
    response: "",
  },
];

const FeedbackSubmission = () => {
  const [filters, setFilters] = useState({
    review: "",
    dateRange: "",
  });

  const reviewOptions = [
    { value: "need", label: "Need Review" },
    { value: "reviewing", label: "Reviewing" },
  ];

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className={styles.reviewManagementContainer}>
      <header className={styles.reviewManagementHeader}>
        <h1 className={styles.reviewManagementTitle}>Review Management</h1>

        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <FilterDropdown
              label="Need Review"
              options={reviewOptions}
              value={filters.review}
              onChange={(value) => handleFilterChange("review", value)}
              placeholder="Need Review"
            />

            <FilterDropdown
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange("dateRange", value)}
              placeholder="All Dates"
            />
          </div>
        </div>
      </header>

      <main className={styles.reviewManagementContent}>
        <Table data={data} />
      </main>
    </div>
  );
};

export default FeedbackSubmission;

// Mockup data for review management
