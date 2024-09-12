import type { FC } from "react";
import { Navigation, Header } from "../../components";
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
