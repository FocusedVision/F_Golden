"use client";

import React from "react";
import { ReviewProps, ReviewData } from "@/types/homeLayout";
import styles from "./Table.module.css";
import Chip from "@/components/chip/Chip";
import Rating from "@mui/material/Rating";

const review: React.FC<ReviewProps> = ({ data }) => {
  const getPerformanceVariant = (status: ReviewData["status"]) => {
    switch (status) {
      case "published":
        return "published";
      case "unpublished":
        return "unpublished";
      default:
        return "published";
    }
  };

  return (
    <div className={`${styles.reviewSection}`}>
      <div className={styles.reviewWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Tenant</th>
              <th>Unit</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Facility</th>
              <th>Review Site</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data?.map((review, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tenent}>{review.tenent}</td>
                <td className={styles.numberCell}>{review.unit}</td>
                <td className={styles.numberCell}>
                  <Rating value={review.rating} precision={0.1} readOnly />
                </td>
                <td className={styles.review}>{review.review}</td>
                <td className={styles.numberCell}>{review.facility}</td>
                <td className={styles.numberCell}>{review.review_site}</td>
                <td className={styles.numberCell}>{review.date}</td>
                <td className={styles.performanceCell}>
                  <Chip
                    variant={getPerformanceVariant(review.status)}
                    size="md"
                  >
                    {review.status === "published"
                      ? "Published"
                      : "Not Published"}
                  </Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default review;
