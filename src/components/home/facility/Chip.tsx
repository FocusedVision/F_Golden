"use client";

import React from "react";
import { ChipProps } from "@/types/homeLayout";
import styles from "./Custom.module.css";

const Chip: React.FC<ChipProps> = ({ variant, children, size = "md" }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return styles.chipSuccess;
      case "error":
        return styles.chipError;
      case "warning":
        return styles.chipWarning;
      case "info":
        return styles.chipInfo;
      case "neutral":
      default:
        return styles.chipNeutral;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return styles.chipSm;
      case "lg":
        return styles.chipLg;
      case "md":
      default:
        return styles.chipMd;
    }
  };

  return (
    <span className={`${styles.chip} ${getVariantClass()} ${getSizeClass()}`}>
      {children}
    </span>
  );
};

export default Chip;
