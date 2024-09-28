import { FC } from "react";
import { Spinner } from "../../components";
import styles from "./pageLoader.module.scss";

const PageLoader: FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.root__spinner}>
                <Spinner />
            </div>
            <p className={styles.root__text}>Loading...</p>
        </div>
    );
};

export default PageLoader;
