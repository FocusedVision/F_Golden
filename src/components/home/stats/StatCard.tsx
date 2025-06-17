"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { StatCardProps } from "@/types/homeLayout";
import styles from "./Custom.module.css";

const StatCard: React.FC<StatCardProps> = ({ data, className = "" }) => {
  const { title, value, iconSrc, trend, trendLabel, trendDirection } = data;

  const getTrendIcon = () => {
    if (trendDirection === "up") {
      return <TrendingUp className={styles.trendIcon} />;
    } else if (trendDirection === "down") {
      return <TrendingDown className={styles.trendIcon} />;
    }
    return null;
  };

  const getTrendClass = () => {
    switch (trendDirection) {
      case "up":
        return styles.trendUp;
      case "down":
        return styles.trendDown;
      default:
        return styles.trendNeutral;
    }
  };

  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statCardHeader}>
        <div className={styles.statCardContent}>
          <h3 className={styles.statCardTitle}>{title}</h3>
          <div className={styles.statCardValue}>{value}</div>
          <div className={`${styles.statCardTrend} ${getTrendClass()}`}>
            {getTrendIcon()}
            <span className={styles.trendValue}>{trend}</span>
            <span className={styles.trendLabel}>{trendLabel}</span>
          </div>
        </div>
        <div className={styles.statCardIcon}>
          <Image
            src={iconSrc}
            alt={title}
            width={48}
            height={48}
            className={styles.iconImage}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
