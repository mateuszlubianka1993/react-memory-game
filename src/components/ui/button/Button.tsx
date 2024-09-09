import { FC } from "react";
import { ButtonProps } from "../../../types/ui.types";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
    return (
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
