import { FC, ChangeEvent, FocusEvent } from "react";
import { InputProps } from "../../../types/ui.types";
import styles from "./input.module.scss";

const Input: FC<InputProps> = ({ label, value = '', placeholder, onChange, onBlur, error = false }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event);
        }
    };

    const inputClassName = `${styles.root__input} ${error ? styles.error : ''}`;

    return (
        <div className={styles.root}>
            {label ? (
                <label className={styles.root__label}>{label}</label>
            ) : null}
            <input
                className={inputClassName}
                type="text"
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;