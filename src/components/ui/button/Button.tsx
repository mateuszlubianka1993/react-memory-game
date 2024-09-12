import { FC } from "react";
import { ButtonProps } from "../../../types/ui.types";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ onClick, children, disabled = false, fluid = false }) => {
    const buttonStyles = `${styles.button} ${disabled ? styles.disabled : ""} ${fluid ? styles.button__fluid : ""}`;

    return (
        <button
            className={buttonStyles}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
