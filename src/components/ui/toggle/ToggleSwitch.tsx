import { FC, useState } from "react";
import styles from "./toggleSwitch.module.scss";
import { ToggleSwitchProps } from "../../../types";

const ToggleSwitch: FC<ToggleSwitchProps> = ({
    label,
    id,
    btnLabels = { yes: 'On', no: 'Off' },
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prevState => {
            onChange(!prevState);

            return !prevState;
        });
    };

    return (
        <div className={styles.root}>
            {label && <label className={styles.root__labelText} htmlFor={id}>{label}</label>}
            <div className={styles.root__control}>
                <input
                    className={styles.root__input}
                    type="checkbox"
                    id={id}
                    onChange={handleToggle}
                    checked={isChecked}
                />
                <label
                    className={`${styles.root__label} ${isChecked ? styles.checked : ''}`}
                    htmlFor={id}
                >
                    <span
                        className={`${styles.root__inner} ${isChecked ? styles.checked : ''}`}
                        data-checked={btnLabels.yes}
                        data-unchecked={btnLabels.no}
                    />
                    <span className={`${styles.root__btn} ${isChecked ? styles.checked : ''}`} />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;
