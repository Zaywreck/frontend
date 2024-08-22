import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/componentStyles/Table.module.css';

const Table = ({ columns, data, actions, calculateRemainingMonths }) => {
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

        const getRemainingMonthsForRow = (row) => {
            if (calculateRemainingMonths) {
                return calculateRemainingMonths(row.quantity, row.average_consumption);
            }
            return 'N/A';
        };

        if (sortConfig.key) {
            filteredData.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'remaining_months') {
                    aValue = getRemainingMonthsForRow(a);
                    bValue = getRemainingMonthsForRow(b);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    }, [searchQuery, data, columns, sortConfig, calculateRemainingMonths]);

    const columnsWithRemainingMonths = useMemo(() => {
        if (!calculateRemainingMonths) {
            return columns;
        }
        return [...columns, 'remaining_months'];
    }, [columns, calculateRemainingMonths]);

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
                        {columnsWithRemainingMonths.map((col, index) => (
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
                            {columnsWithRemainingMonths.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`${styles.cellTable} ${col === 'remaining_months' && calculateRemainingMonths
                                        ? getRemainingMonthsStyle(calculateRemainingMonths(row.quantity, row.average_consumption))
                                        : ''
                                        }`}
                                >
                                    {col === 'remaining_months' && calculateRemainingMonths ? (
                                        calculateRemainingMonths(row.quantity, row.average_consumption)
                                    ) : (
                                        row[col]
                                    )}
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

const getRemainingMonthsStyle = (remainingMonths) => {
    if (remainingMonths === null) return '';
    const months = Number(remainingMonths);
    if (months <= 0) return styles.critical;
    if (months <= 1) return styles.warning;
    if (months <= 2) return styles.alert;
    if (months <= 5) return styles.notice;
    return '';
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            handler: PropTypes.func.isRequired
        })
    ),
    calculateRemainingMonths: PropTypes.func
};

export default Table;
