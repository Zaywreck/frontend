import styles from '@/styles/componentStyles/PageSelector.module.css';

function PageSelector({ currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange }) {
    return (
        <div className={styles.PageSelectorContainer}>
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className={styles.button}
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className={styles.button}
            >
                Next
            </button>
            <select 
                value={rowsPerPage} 
                onChange={handleRowsPerPageChange} 
                className={styles.select}
            >
                <option value={50} className={styles.option}>50</option>
                <option value={100} className={styles.option}>100</option>
            </select>
        </div>
    );
}

export default PageSelector;
