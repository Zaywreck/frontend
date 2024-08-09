import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/componentStyles/Table.css';
const Table = ({ columns, data, actions }) => {
    return (
        <table className="generic-table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                    {actions.length > 0 && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{row[col]}</td>
                        ))}
                        {actions.length > 0 && (
                            <td>
                                {actions.map((action, actionIndex) => (
                                    <button
                                        key={actionIndex}
                                        onClick={() => action.handler(row)}
                                        className="action-button"
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
