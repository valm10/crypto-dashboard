import React from "react";
import styles from './components.module.css';

function SearchBar() {
    return (
        <div>
            <input type ="text" placeholder="Search coin..." className={styles.searchInput}></input>
        </div>
    );
}

export default SearchBar;