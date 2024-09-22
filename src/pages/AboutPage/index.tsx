import { FC } from "react";
import styles from "./aboutPage.module.scss";

const AboutPage: FC = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.root__title}>About Us</h1>
            <p className={styles.root__info}>
                Welcome to the React Memory Game! This game is designed to test your memory skills.
            </p>
            <p className={styles.root__info}>
                Match pairs of cards to win the game. Have fun!
            </p>
        </div>
    );
};

export default AboutPage;
