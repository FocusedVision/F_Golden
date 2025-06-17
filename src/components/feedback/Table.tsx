"use client";

import React from "react";
import { FeedbackProps } from "@/types/homeLayout";
import styles from "./Table.module.css";

const Table: React.FC<FeedbackProps> = ({ data }) => {
  return (
    <div className={`${styles.feedbackSection}`}>
      <div className={styles.feedbackWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Date</th>
              <th>Facility Name</th>
              <th>Tenant</th>
              <th className={styles.thwidht}>Communication</th>
              <th>Friendliness</th>
              <th>Cleanliness</th>
              <th>Unit Selection</th>
              <th>Rental Process</th>
              <th>Overall Rating</th>
              <th>Review</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data?.map((feedback, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.date}>{feedback.date}</td>
                <td className={styles.numberCell}>{feedback.facility}</td>
                <td className={styles.numberCell}>{feedback.tenant}</td>
                <td className={styles.communication}>
                  {feedback.communication}
                </td>
                <td className={styles.numberCell}>{feedback.friendliness}</td>
                <td className={styles.numberCell}>{feedback.cleanliness}</td>
                <td className={styles.numberCell}>{feedback.unit_selection}</td>
                <td className={styles.numberCell}>{feedback.rental_process}</td>
                <td className={styles.numberCell}>{feedback.overall_rating}</td>
                <td className={styles.numberCell}>{feedback.review}</td>
                <td className={styles.status}>
                  {feedback.status === "need" ? "Need Review" : "Reviewed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
