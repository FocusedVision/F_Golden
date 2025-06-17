"use client";

import React, { useState } from "react";
import styles from "./Feedback.module.css";
import FilterDropdown from "@/components/filter/FilterDropdown";
import Table from "@/components/feedback/Table";

const mockFeedbackData = [
  {
    date: "2024-01-15",
    facility: "Golden Storage North",
    tenant: "John Smith",
    communication: 8,
    friendliness: 9,
    cleanliness: 7,
    unit_selection: 8,
    rental_process: 6,
    overall_rating: 8,
    review:
      "Great experience overall. Staff was very friendly and helpful during the rental process. The facility is clean and well-maintained.",
    status: "need",
  },
  {
    date: "2024-01-14",
    facility: "Golden Storage South",
    tenant: "Sarah Johnson",
    communication: 7,
    friendliness: 8,
    cleanliness: 9,
    unit_selection: 7,
    rental_process: 8,
    overall_rating: 8,
    review:
      "Very satisfied with the service. The unit was exactly what I needed and the facility exceeded my expectations in terms of cleanliness.",
    status: "reviewing",
  },
  {
    date: "2024-01-13",
    facility: "Golden Storage East",
    tenant: "Mike Chen",
    communication: 6,
    friendliness: 7,
    cleanliness: 8,
    unit_selection: 9,
    rental_process: 7,
    overall_rating: 7,
    review:
      "Good selection of units available. The process was smooth and the facility is secure. Could improve on communication during off-hours.",
    status: "need",
  },
  {
    date: "2024-01-12",
    facility: "Golden Storage West",
    tenant: "Emily Davis",
    communication: 9,
    friendliness: 9,
    cleanliness: 8,
    unit_selection: 8,
    rental_process: 9,
    overall_rating: 9,
    review:
      "Excellent customer service! The staff went above and beyond to help me find the perfect unit. Highly recommend this facility.",
    status: "reviewing",
  },
  {
    date: "2024-01-11",
    facility: "Golden Storage North",
    tenant: "David Wilson",
    communication: 5,
    friendliness: 6,
    cleanliness: 7,
    unit_selection: 6,
    rental_process: 5,
    overall_rating: 6,
    review:
      "Average experience. The facility is decent but the rental process took longer than expected. Communication could be improved.",
    status: "need",
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
    <div className={styles.feedbackContainer}>
      <header className={styles.feedbackHeader}>
        <h1 className={styles.feedbackTitle}>Feedback Submissions</h1>

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

      <main className={styles.mainContent}>
        <Table data={mockFeedbackData} />
      </main>
    </div>
  );
};

export default FeedbackSubmission;
