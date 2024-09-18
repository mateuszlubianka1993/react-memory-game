import { FC } from "react";
import { TableProps } from "../../../types";
import styles from "./table.module.scss";

const Table: FC<TableProps> = ({ headers, data }) => {
    if (!data.length) {
        return <p className={styles.noData}>
            No data to display...
        </p>;
    }

    return (
        <table className={styles.table} cellPadding="0" cellSpacing="0">
            <thead className={styles.table__header}>
                <tr>
                    {headers.map((header) => (
                        <th key={header.id} className={styles.table__header__cell}>
                            {header.text}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.table__content}>
                {data.map((row, rowIndex) => (
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