import type { FC } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import { HOMEPAGE_ROUTES } from "../../config/router";
import styles from "./homepage.module.scss";

const HomePage: FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.root__navBox}>
        <Navigation navItems={HOMEPAGE_ROUTES} />
      </div>
    </div>
  );
}

export default HomePage;
