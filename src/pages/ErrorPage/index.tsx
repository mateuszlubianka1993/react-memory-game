import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button } from "../../components";
import styles from "./errorPage.module.scss";

const ErrorPage: FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Header />
            <main className={styles.root}>
                <div className={styles.root__content}>
                    <h1 className={styles.root__title}>404 - Page Not Found</h1>
                    <p className={styles.root__text}>Sorry, the page you are looking for does not exist.</p>
                    <Button onClick={handleGoBack}>Go Back</Button>
                </div>
            </main>
        </>
    );
};

export default ErrorPage;
