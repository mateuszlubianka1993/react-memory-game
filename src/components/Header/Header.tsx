import { FC } from "react";
import { Link } from "react-router-dom";
import { GrGamepad } from "react-icons/gr";
import { ROUTER_PATHS } from "../../config/router";
import styles from "./header.module.scss";

const Header: FC = () => {
    return (
        <header className={styles.root}>
            <Link to={ROUTER_PATHS.HOME} className={styles.root__link}>
                <div className={styles.root__log}>
                    <GrGamepad />
                </div>
                <h1 className={styles.root__title}>Memory</h1>
            </Link>
        </header>
    );
};

export default Header;
