"use client";

import React from "react";
import styles from "./SortButton.module.css";

interface SortButtonProps {
  label: string;
  onChange: (direction: "asc" | "desc") => void;
  currentDirection?: "asc" | "desc";
}

export default function SortButton({
  label,
  onChange,
  currentDirection = "asc",
}: SortButtonProps) {
  const [isActive, setIsActive] = React.useState(false);

  const handleToggle = () => {
    setIsActive(true);
    const newDirection = currentDirection === "asc" ? "desc" : "asc";
    onChange(newDirection);

    // Remove active state after a short delay
    setTimeout(() => setIsActive(false), 200);
  };

  const getSortIcon = () => {
    return (
      <svg
        className={`${styles.sortArrow}`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        {/* Up arrow */}
        <path
          d="M8 3L11 7H5L8 3Z"
          opacity={currentDirection === "asc" ? "1" : "0.4"}
        />
        {/* Down arrow */}
        <path
          d="M8 13L5 9H11L8 13Z"
          opacity={currentDirection === "desc" ? "1" : "0.4"}
        />
      </svg>
    );
  };

  return (
    <button
      className={`${styles.sortButton} ${isActive ? styles.sortButtonActive : ""}`}
      onClick={handleToggle}
      type="button"
      title={`Sort ${label} ${currentDirection}`}
    >
      <span className={styles.sortLabel}>{label}</span>
      {getSortIcon()}
    </button>
  );
}
