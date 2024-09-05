import { FC } from "react";
import NavigationItem  from "./NavigationItem";
import { INavigation } from "../../types";
import style from "./navigation.module.scss";

const Navigation: FC<INavigation> = ({ navItems }) => {
    if (!navItems || navItems.length <= 0) return null;

    return (
        <nav className={style.root}>
            <ul  className={style.root__list}>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavigationItem path={item.path} text={item.text} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;