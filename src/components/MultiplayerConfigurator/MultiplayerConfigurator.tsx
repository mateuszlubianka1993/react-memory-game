import { FC } from "react";
import { ToggleSwitch } from "../../components";
import styles from "./multiplayerConfigurator.module.scss";

interface MultiplayerConfiguratorProps {
    onChange: (state: boolean) => void;
}

const MultiplayerConfigurator: FC<MultiplayerConfiguratorProps> = ({onChange}) => {

    return (
        <div className={styles.root}>
            <ToggleSwitch
                label="Enable multiplayer"
                id="switchBtn"
                onChange={onChange}
            />
        </div>
    );
};

export default MultiplayerConfigurator;