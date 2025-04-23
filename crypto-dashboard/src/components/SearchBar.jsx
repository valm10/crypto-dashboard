import React from "react";
import styles from "./components.module.css";

//search input to filter coins
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div>
      <label htmlFor="search" className={styles.searchLabel}></label>
      <input
        id="search"
        type="text"
        placeholder="Search coin..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
