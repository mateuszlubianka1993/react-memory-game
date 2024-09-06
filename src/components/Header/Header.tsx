import { FC } from "react";
import { GrGamepad } from "react-icons/gr";
import styles from "./header.module.scss";

const Header: FC = () => {
    return (
        <header className={styles.root}>
            <div className={styles.root__log}>
                <GrGamepad />
            </div>
            <h1 className={styles.root__title}>Memory</h1>
        </header>
    );
};

export default Header;
