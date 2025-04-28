import PropTypes from 'prop-types';
import styles from '../styles/components.module.css';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div>
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

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
