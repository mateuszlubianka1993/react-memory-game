import { FC } from "react";
import { Link } from "react-router-dom";
import { INavigationItem } from "../../types";
import styles from "./NavigationItem.module.scss";

const NavigationItem: FC<INavigationItem> = ({ path, text }) => {
  return (
    <Link to={path} className={styles.root}>
        <div className={styles.root__content}>
            {text}
        </div>
    </Link>
  );
}

export default NavigationItem;
