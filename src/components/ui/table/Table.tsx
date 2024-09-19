import { FC, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { TableProps, SortType, TableSortConfig, TableHeaderItem } from "../../../types";
import { SORT_TYPES } from "../../../config/ui";
import styles from "./table.module.scss";

const Table: FC<TableProps> = ({ headers, data }) => {
    const [sortConfig, setSortConfig] = useState<TableSortConfig | null>(null);

    const sortedData = [...data];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === SORT_TYPES.ASCENDING ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === SORT_TYPES.ASCENDING ? 1 : -1;
            }
            return 0;
        });
    }

    const requestSort = (key: string) => {
        let direction: SortType = SORT_TYPES.ASCENDING as SortType;

        if (sortConfig && sortConfig.key === key && sortConfig.direction === SORT_TYPES.ASCENDING) {
            direction = SORT_TYPES.DESCENDING as SortType;
        }

        setSortConfig({ key, direction });
    };

    const handleHeaderClick = (header: TableHeaderItem) => {
        if (!header.sortable) {
            return;
        }

        requestSort(header.id);
    };

    if (!data.length) {
        return <p className={styles.noData}>
            No data to display...
        </p>;
    }

    const sortArrow = (header: TableHeaderItem) => {
        if (!header.sortable) {
            return null;
        }

        const isArrowActive = (direction: SortType) => {

            return sortConfig?.key === header.id && sortConfig?.direction === direction;
        };

        return <div className={styles.sortArrow}>
            <div
                className={`${styles.sortArrow__icon} ${isArrowActive(SORT_TYPES.ASCENDING) ? styles.active : ''}`}
            >
                <BiSolidUpArrow />
            </div>
            <div
                className={`${styles.sortArrow__icon} ${isArrowActive(SORT_TYPES.DESCENDING) ? styles.active : ''}`}
            >
                <BiSolidDownArrow />
            </div>
        </div>
    };

    return (
        <table className={styles.table} cellPadding="0" cellSpacing="0">
            <thead className={styles.table__header}>
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header.id}
                            className={styles.table__header__cell}
                            onClick={() => handleHeaderClick(header)}
                        >
                            <div className={styles.table__header__cell__content}>
                                <span>
                                    {header.text}
                                </span>
                                {sortArrow(header)}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.table__content}>
                {sortedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map((header) => (
                            <td className={styles.table__content__cell} key={header.id}>
                                {row[header.id]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;