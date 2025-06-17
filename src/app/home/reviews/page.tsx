"use client";

import React, { useState } from "react";
import styles from "./Review.module.css";
import FilterDropdown from "@/components/review/FilterDropdown";
import SortButton from "@/components/review/SortButton";
import Table from "@/components/review/Table";
import { ReviewData } from "@/types/homeLayout";

export default function Reviews() {
  const [filters, setFilters] = useState({
    rating: "",
    reviewContent: "",
    reviewSite: "",
    dateRange: "",
    status: "",
    actionType: "",
  });

  const [facilitySortDirection, setFacilitySortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Mockup review data
  const mockReviewData: ReviewData[] = [
    {
      tenent: "Sarah Johnson",
      unit: "A-101",
      rating: 5,
      review:
        "Excellent facilities and very responsive management. The amenities are top-notch and maintenance requests are handled quickly.",
      facility: "Sunset Gardens",
      review_site: "Google",
      date: "2024-01-15",
      status: "published",
    },
    {
      tenent: "Michael Chen",
      unit: "B-205",
      rating: 2,
      review:
        "Poor maintenance response times and noisy neighbors. The parking situation is also inadequate for residents.",
      facility: "Pine Ridge Apartments",
      review_site: "Yelp",
      date: "2024-01-12",
      status: "unpublished",
    },
    {
      tenent: "Emily Rodriguez",
      unit: "C-304",
      rating: 4,
      review:
        "Great location and clean common areas. The only downside is the thin walls between units.",
      facility: "Metro Heights",
      review_site: "Facebook",
      date: "2024-01-10",
      status: "published",
    },
    {
      tenent: "David Thompson",
      unit: "D-150",
      rating: 3,
      review:
        "Average experience overall. Some amenities need updating but the staff is friendly and helpful.",
      facility: "Oakwood Commons",
      review_site: "Google",
      date: "2024-01-08",
      status: "published",
    },
    {
      tenent: "Lisa Martinez",
      unit: "E-402",
      rating: 1,
      review:
        "Terrible experience with constant water leaks and unresponsive management. Would not recommend to anyone.",
      facility: "Riverside Towers",
      review_site: "TripAdvisor",
      date: "2024-01-05",
      status: "unpublished",
    },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleFacilitySort = (direction: "asc" | "desc") => {
    setFacilitySortDirection(direction);
  };

  const ratingOptions = [
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  const reviewContentOptions = [
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
    { value: "neutral", label: "Neutral" },
    { value: "mixed", label: "Mixed" },
  ];

  const reviewSiteOptions = [
    { value: "google", label: "Google" },
    { value: "yelp", label: "Yelp" },
    { value: "facebook", label: "Facebook" },
    { value: "tripadvisor", label: "TripAdvisor" },
  ];

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "reviewed", label: "Reviewed" },
    { value: "responded", label: "Responded" },
    { value: "archived", label: "Archived" },
  ];

  const actionTypeOptions = [
    { value: "respond", label: "Respond" },
    { value: "escalate", label: "Escalate" },
    { value: "flag", label: "Flag" },
    { value: "archive", label: "Archive" },
  ];

  return (
    <div className={styles.reviewContainer}>
      <header className={styles.reviewHeader}>
        <h1 className={styles.reviewTitle}>Reviews Analysis</h1>
      </header>

      <div className={styles.filtersSection}>
        <div className={styles.filtersGrid}>
          <SortButton
            label="Facility"
            currentDirection={facilitySortDirection}
            onChange={handleFacilitySort}
          />

          <FilterDropdown
            label="Rating"
            options={ratingOptions}
            value={filters.rating}
            onChange={(value) => handleFilterChange("rating", value)}
            placeholder="All Ratings"
          />

          <FilterDropdown
            label="Review Content"
            options={reviewContentOptions}
            value={filters.reviewContent}
            onChange={(value) => handleFilterChange("reviewContent", value)}
            placeholder="All Content"
          />

          <FilterDropdown
            label="Review Site"
            options={reviewSiteOptions}
            value={filters.reviewSite}
            onChange={(value) => handleFilterChange("reviewSite", value)}
            placeholder="All Sites"
          />

          <FilterDropdown
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange("dateRange", value)}
            placeholder="All Dates"
          />

          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            placeholder="All Status"
          />

          <FilterDropdown
            label="Action Type"
            options={actionTypeOptions}
            value={filters.actionType}
            onChange={(value) => handleFilterChange("actionType", value)}
            placeholder="All Actions"
          />
        </div>
      </div>

      <main className={styles.mainContent}>
        <Table data={mockReviewData} />
      </main>
    </div>
  );
}
