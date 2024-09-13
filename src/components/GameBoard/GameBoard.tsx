import { FC, useState, useEffect, useCallback } from "react";
import { GameCard, EndGame } from "../../components";
import { createDeck } from "../../helpers/createDeck";
import { DeckItem, GameBoardProps, GameCardMode } from '../../types';
import { ROUND_TIME, BLOCK_TIME, END_GAME_TIMEOUT } from "../../config/game";
import styles from "./gameBoard.module.scss";

const GameBoard: FC<GameBoardProps> = ({userName}) => {
    const [openPairs, setOpenPairs] = useState<string[]>([]);
    const [foundPairs, setFoundPairs] = useState<string[]>([]);
    const [cards, setCards] = useState<DeckItem[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [showEndGame, setShowEndGame] = useState(false);
    const [gameHistory, setGameHistory] = useState<any>([]);
    const endGame = foundPairs.length > 0 && foundPairs.length === cards.length / 2;
    
    const handleCardClick = useCallback((id: string) => {
        setOpenPairs(prevState => [...prevState, id]);
    }, []);
    const isCardOpen = (id: string) => {
        const found = openPairs.find(openId => openId === id) || foundPairs.find(foundId =>  id.includes(foundId));

        return !!found;
    };

    const onModalClose = useCallback(() => {
        setShowEndGame(false);
    }, []);

    const checkPairs = () => {
        if (endGame) {
            return setTimeout(() => {
                setShowEndGame(true);
            }, END_GAME_TIMEOUT);
        }

        if (openPairs.length === 2) {
            setGameHistory([...gameHistory, {user: userName}]);

            const [first, second] = openPairs;
            const firstPairId = first.split('-')[0];
            const secondPairId = second.split('-')[0];

            if (firstPairId === secondPairId) {
                setFoundPairs(precState => [...precState, firstPairId]);
                return setTimeout(() => {
                    setOpenPairs([]);
                    setDisabled(false);
                }, BLOCK_TIME);
            } else {
                return setTimeout(() => {
                    setOpenPairs([]);
                    setDisabled(false);
                }, ROUND_TIME);
            }
        }
    };

    const onGameRestart = () => {
        setOpenPairs([]);
        setFoundPairs([]);
        setShowEndGame(false);
        setDisabled(false);
        setGameHistory([]);
        const newCards = createDeck(GameCardMode.FLAGS);

        setCards(newCards);
    };
    
    useEffect(() => {
        const cards = createDeck(GameCardMode.FLAGS);

        setCards(cards);
    }, []);

    useEffect(() => {
        if (openPairs.length === 2) {
            setDisabled(true);
        }
        const timer = checkPairs();

        return () => clearTimeout(timer);
    }, [openPairs]);

    return (
        <> 
            <EndGame
                isOpen={showEndGame}
                name={userName}
                onModalClose={onModalClose}
                restartGame={onGameRestart}
                moves={gameHistory.length}
            />
            <div className={styles.root}>
                <h2 className={styles.root__title}>Hello {userName}! Moves: {gameHistory.length}</h2>
                <div className={styles.root__boardContainer}>
                    {cards.map((card) => (
                        <GameCard
                            key={card.id}
                            card={card}
                            onClick={handleCardClick}
                            blockClickOpen={true}
                            disabled={disabled}
                            isOpen={isCardOpen(card.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default GameBoard;