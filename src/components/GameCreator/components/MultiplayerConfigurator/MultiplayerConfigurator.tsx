import { FC } from "react";
import { ToggleSwitch } from "../../../../components";

interface MultiplayerConfiguratorProps {
    onChange: (state: boolean) => void;
}

const MultiplayerConfigurator: FC<MultiplayerConfiguratorProps> = ({onChange}) => {

    return (
        <div>
            <ToggleSwitch
                label="Enable multiplayer"
                id="switchBtn"
                onChange={onChange}
            />
        </div>
    );
};

export default MultiplayerConfigurator;