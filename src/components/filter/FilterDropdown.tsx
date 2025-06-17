"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterDropdown.module.css";

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.dropdownLabel}>
          {selectedOption?.label || label}
        </span>
        <svg
          className={`${styles.dropdownArrow}`}
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          {isOpen ? (
            // Up triangle when open (centered)
            <path d="M8 5L11 10H5L8 5Z" />
          ) : (
            // Down triangle when closed (centered)
            <path d="M8 11L5 6H11L8 11Z" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.dropdownOption} ${
                value === option.value ? styles.dropdownOptionSelected : ""
              }`}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
