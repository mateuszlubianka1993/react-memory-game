import { FC } from "react";
import { motion } from "framer-motion";
import { ButtonProps } from "../../../types/ui.types";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ onClick, children, disabled = false, fluid = false }) => {
    const buttonStyles = `${styles.button} ${disabled ? styles.disabled : ""} ${fluid ? styles.button__fluid : ""}`;

    return (
        <motion.button
            className={buttonStyles}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
