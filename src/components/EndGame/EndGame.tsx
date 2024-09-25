import { FC, useState } from "react";
import { Modal, Button } from "../../components";
import { EndGameProps } from '../../types';
import styles from "./endGame.module.scss";

const EndGame: FC<EndGameProps> = ({
    name,
    isMultiplayer,
    gameHistory,
    deckType,
    restartGame,
    onModalClose,
}) => {
    const [saved, setSaved] = useState<boolean>(false);
    const moves = !isMultiplayer && gameHistory.length;
    const yourPairs = gameHistory.filter(item => (item.user === name) && item.foundPair).length;
    const oponentPairs = gameHistory.filter(item => (item.user !== name) && item.foundPair).length;
    let title = `Congratulations ${name}!`;
    const handleRestartGame = () => {
        restartGame();
    };

    const handleSaveResult = () => {
        const results = JSON.parse(localStorage.getItem('best_results') || '[]');
        const result = {
            name,
            moves,
            mode: deckType,
            date: new Date().toISOString(),
        };

        localStorage.setItem('best_results', JSON.stringify([result, ...results]));
        setSaved(true);
    };

    if (isMultiplayer) {
        title = yourPairs > oponentPairs ? `You won ${name}!` : `You lost! ${name}`;
    }

    return (
        <Modal onModalClose={onModalClose}>
            <div className={styles.root}>
                {saved ? (
                    <>
                        <h2 className={styles.root__title}>Score saved!</h2>
                    </>
                ) : (
                    <>
                        <h2 className={styles.root__title}>{title}</h2>
                        {!isMultiplayer ? <p className={styles.root__text}>You found all the pairs.</p> : null}
                        {!isMultiplayer ? (
                            <p className={styles.root__text}>Your moves: {moves}</p>
                        ) : (
                            <>
                                <p className={styles.root__text}>Your pairs: {yourPairs}</p>
                                <p className={styles.root__text}>Oponent pairs: {oponentPairs}</p>
                            </>
                        )}
                    </>
                )}
                
                <div className={styles.root__actions}>
                    {!isMultiplayer && !saved ? (
                        <div className={styles.root__actions__saveBtn}>
                            <Button onClick={handleSaveResult} fluid>Save Result</Button>
                        </div>
                    ) : null}
                    <Button onClick={handleRestartGame} fluid>Restart Game</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EndGame;