"use client";

import React from "react";
import { ReviewManagementProps } from "@/types/homeLayout";
import { AutoAwesome, Cached } from "@mui/icons-material";
import styles from "./Table.module.css";

const Table: React.FC<ReviewManagementProps> = ({ data }) => {
  return (
    <div className={`${styles.reviewManagementSection}`}>
      <div className={styles.reviewManagementWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Date</th>
              <th>Facility Name</th>
              <th>Tenant</th>
              <th>Overall Rating</th>
              <th>Review</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data?.map((review, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.date}>{review.date}</td>
                <td className={styles.numberCell}>{review.facility}</td>
                <td className={styles.numberCell}>{review.tenant}</td>
                <td className={styles.numberCell}>{review.overall_rating}</td>
                <td className={styles.review}>{review.review}</td>
                <td className={styles.response}>
                  <tr className={styles.responseText}>
                    {<AutoAwesome />}Thank you, {review.tenant}, for your kind
                    words!{" "}
                  </tr>
                  <tr className={styles.action}>
                    <button className={styles.actionButton}>
                      <Cached />
                    </button>
                    <button className={styles.actionButton}>submit</button>
                  </tr>
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
