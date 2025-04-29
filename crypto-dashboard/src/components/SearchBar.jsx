"use client";

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components.module.css';

// Input for searching coins
export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        id="search"
        type="text"
        placeholder="Search coin..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

// PropTypes validation
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
