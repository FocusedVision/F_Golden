"use client";

import React from "react";
import { StatCardData } from "@/types/homeLayout";
import StatCard from "./StatCard";
import styles from "./Custom.module.css";

interface StatsProps {
  stats: StatCardData[];
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ stats, className = "" }) => {
  return (
    <section className={`${styles.statsSection} ${className}`}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            data={stat}
            className={styles.statCardWrapper}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;
