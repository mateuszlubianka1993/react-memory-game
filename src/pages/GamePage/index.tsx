import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GameCreator,
    Header,
    GameBoard,
    Button,
} from "../../components";

const GamePage: FC = () => {
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();

    const onGameCreated = (userName: string) => {
        setUserName(userName);
    };

    const handleQuitGame = () => {
        navigate("/");
    };

    return (
        <div>
            {!userName ? (
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
                        <GameBoard userName={userName} />
                    </main>
                </>
            )}
        </div>
    );
};

export default GamePage;