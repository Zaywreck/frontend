import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/componentStyles/Table.module.css';

const Table = ({ columns, data, actions }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredData = useMemo(() => {
        let filteredData = data;
        
        if (searchQuery) {
            filteredData = filteredData.filter(row =>
                columns.some(col =>
                    String(row[col]).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (sortConfig.key) {
            filteredData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    }, [searchQuery, data, columns, sortConfig]);

    return (
        <div className={styles.tableContainer}>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchBarTable}
            />
            <table className={styles.genericTableTable}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                onClick={() => handleSort(col)}
                                className={styles.headerCellTable}
                            >
                                {col}
                                {sortConfig.key === col && (
                                    <span>
                                        {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                                    </span>
                                )}
                            </th>
                        ))}
                        {actions.length > 0 && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className={styles.cellTable}>
                                    {row[col]}
                                </td>
                            ))}
                            {actions.length > 0 && (
                                <td>
                                    {actions.map((action, actionIndex) => (
                                        <button
                                            key={actionIndex}
                                            onClick={() => action.handler(row)}
                                            className={styles.actionButtonTable}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            handler: PropTypes.func.isRequired
        })
    )
};

export default Table;
