import { FC, useState } from "react";
import {
    GameCreator,
    GameBoard,
} from "../../components";
import { GAME_CARD_MODES } from "../../config/game";
import { GameConfig } from "../../types";

const GamePage: FC = () => {
    const [gameConfig, setGameConfig] = useState<GameConfig>({
        userName: '',
        multiplayer: false,
        mode: GAME_CARD_MODES.FLAGS,
    });
    const startGame = gameConfig.userName;

    const onGameCreated = (config: GameConfig) => {
        setGameConfig(config);
    };

    return (
        <div>
            {!startGame ? (
                <GameCreator onGameCreated={onGameCreated} />
            ) : (
                <main>
                    <GameBoard gameConfig={gameConfig} />
                </main>
            )}
        </div>
    );
};

export default GamePage;