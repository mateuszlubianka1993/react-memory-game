import { FC, useState, ChangeEvent } from "react";
import { Input, Button, MultiplayerConfigurator } from "../../components";
import { GameCreatorProps } from '../../types';
import styles from "./gameCreator.module.scss";

const GameCreator: FC<GameCreatorProps> = ({ onGameCreated }) => {
    const [userName, setUserName] = useState<string>('');
    const [wasInputTouched, setWasInputTouched] = useState<boolean>(false);
    const [multiplayer, setMultiplayer] = useState<boolean>(false);

    const isInputValid = !!userName && userName.length >= 3;

    const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleCreateGame = () => {
        setWasInputTouched(true);

        if (!userName) {
            return;
        }

        onGameCreated({userName, multiplayer});
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.root__title}>Create a New Game</h2>
            <div>
                <div className={styles.root__userBox}>
                    <Input
                        label="User Name"
                        value={userName}
                        placeholder="Enter a name..."
                        error={wasInputTouched && !isInputValid}
                        onChange={handleUserNameChange}
                        onBlur={() => setWasInputTouched(true)}
                    />
                </div>
                <div>
                    <MultiplayerConfigurator onChange={(state) => setMultiplayer(state)}/>
                </div>
            </div>
            <Button
                disabled={!isInputValid}
                onClick={handleCreateGame}
            >
                Start Game
            </Button>
        </div>
    );
};

export default GameCreator;