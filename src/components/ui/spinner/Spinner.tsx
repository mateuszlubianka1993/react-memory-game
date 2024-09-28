import { FC } from "react";
import styles from "./spinner.module.scss";

const Spinner: FC = () => {
    return (
        <div className={styles.root} role="status"></div>
    );
};

export default Spinner;
