import { FC, useState, ChangeEvent, useCallback } from "react";
import { Input, Button } from "../../components";
import { ModeItem, MultiplayerConfigurator } from "./components";
import { GameCreatorProps, GameCardMode } from '../../types';
import styles from "./gameCreator.module.scss";
import { GAME_CARD_MODES } from "../../config/game";

const GameCreator: FC<GameCreatorProps> = ({ onGameCreated }) => {
    const [userName, setUserName] = useState<string>('');
    const [wasInputTouched, setWasInputTouched] = useState<boolean>(false);
    const [multiplayer, setMultiplayer] = useState<boolean>(false);
    const [deckType, setDeckType] = useState<GameCardMode>(GAME_CARD_MODES.FLAGS);

    const isInputValid = !!userName && userName.length >= 3;

    const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleCreateGame = () => {
        setWasInputTouched(true);

        if (!userName) {
            return;
        }

        onGameCreated({
            userName,
            multiplayer,
            mode: deckType,
        });
    };

    const handleModeChange = useCallback((mode: GameCardMode) => {
        setDeckType(mode);
    }, []);

    return (
        <div className={styles.root}>
            <h2 className={styles.root__title}>Create a New Game</h2>
            <div className={styles.root__section}>
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
                <div className={styles.root__modeBox}>
                    {Object.values(GAME_CARD_MODES).map((mode: string) => (
                        <div key={mode} className={styles.root__modeBox__item}>
                            <ModeItem
                                modeName={mode}
                                onClick={handleModeChange}
                                active={mode === deckType}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.root__section}>
                <div>
                    <MultiplayerConfigurator onChange={(state) => setMultiplayer(state)}/>
                </div>
            </div>
            <div className={styles.root__section}>
                <Button
                    disabled={!isInputValid}
                    onClick={handleCreateGame}
                >
                    Start Game
                </Button>
            </div>
        </div>
    );
};

export default GameCreator;