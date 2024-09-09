import { FC, useState } from "react";
import { GameCreator, Header } from "../../components";

const GamePage: FC = () => {
    const [userName, setUserName] = useState<string>('');
    const onGameCreated = (userName: string) => {
        setUserName(userName);
    };

    return (
        <div>
            {!userName ? (
                <>
                    <Header />
                    <GameCreator onGameCreated={onGameCreated} />
                </>
            ) : (
                <p>In progress...</p>
            )}
        </div>
    );
};

export default GamePage;