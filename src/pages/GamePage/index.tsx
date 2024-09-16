import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GameCreator,
    Header,
    GameBoard,
    Button,
} from "../../components";
import { ROUTER_PATHS } from "../../config/router";
import { GameConfig } from "../../types";

const GamePage: FC = () => {
    const [gameConfig, setGameConfig] = useState<GameConfig>({userName: '', multiplayer: false});
    const navigate = useNavigate();
    const startGame = gameConfig.userName;

    const onGameCreated = (config: GameConfig) => {
        setGameConfig(config);
    };

    const handleQuitGame = () => {
        navigate(ROUTER_PATHS.HOME);
    };

    return (
        <div>
            {!startGame ? (
                <>
                    <Header />
                    <GameCreator onGameCreated={onGameCreated} />
                </>
            ) : (
                <>
                    <nav>
                        <Button onClick={handleQuitGame}>
                            Quit the game
                        </Button>
                    </nav>
                    <main>
                        <GameBoard gameConfig={gameConfig} />
                    </main>
                </>
            )}
        </div>
    );
};

export default GamePage;