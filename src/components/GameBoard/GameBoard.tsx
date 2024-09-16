import { FC, useState, useEffect, useCallback, useRef } from "react";
import { GameCard, EndGame } from "../../components";
import { createDeck } from "../../helpers/createDeck";
import { DeckItem, GameBoardProps, GameCardMode, GameHistoryItem } from '../../types';
import { ROUND_TIME, END_GAME_TIMEOUT, COMPUTER_NAME } from "../../config/game";
import styles from "./gameBoard.module.scss";

const GameBoard: FC<GameBoardProps> = ({ gameConfig }) => {
    const [cards, setCards] = useState<DeckItem[]>(createDeck(GameCardMode.FLAGS));
    const [openPairs, setOpenPairs] = useState<string[]>([]);
    const [foundPairs, setFoundPairs] = useState<string[]>([]);
    const [disabled, setDisabled] = useState(false);
    const { userName, multiplayer: isMultiplayer } = gameConfig;
    const players = isMultiplayer ? [userName, COMPUTER_NAME] : [userName];
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);
    const [showEndGame, setShowEndGame] = useState(false);
    const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
    const endGame = foundPairs.length > 0 && foundPairs.length === cards.length / 2;
    const moves = !isMultiplayer && gameHistory.length;
    const timeoutRef = useRef(null);

    const handleCardClick = useCallback((id: string) => {
        if (openPairs.length === 1) {
            setOpenPairs((prev) => [...prev, id]);
        } else {
            setOpenPairs([id]);
        }
    }, [openPairs]);

    const isCardOpen = (id: string) => {
        const found = openPairs.find(openId => openId === id) || foundPairs.find(foundId =>  id.includes(foundId));

        return !!found;
    };

    const checkPairs = () => {
        const [first, second] = openPairs;
        const firstPairId = first.split('-')[0];
        const secondPairId = second.split('-')[0];
        const isPair = firstPairId === secondPairId;

        setGameHistory(prevState => [...prevState, { user: currentPlayer, foundPair: isPair }]);

        if (isPair) {
            setFoundPairs(prevState => [...prevState, firstPairId]);
            setOpenPairs([]);
        } else {
            setOpenPairs([]);
            setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0]);
        }
    };

    const handleComputerTurn = () => {
        const availablePairs = cards.filter(card => !foundPairs.includes(card.pairId));
        
        if (availablePairs.length < 2) return;

        const getRandomIndex = (excludeIndex?: number) => {
            let index;
            do {
                index = Math.floor(Math.random() * availablePairs.length);
            } while (index === excludeIndex);
            return index;
        };

        const randomIndex1 = getRandomIndex();

        setTimeout(() => {
            handleCardClick(availablePairs[randomIndex1].id);
        }, 1000);
    };

    useEffect(() => {
        if (endGame) {
            setTimeout(() => {
                setShowEndGame(true);
            }, END_GAME_TIMEOUT);
        }

        if (openPairs.length === 2) {
            setDisabled(true);

            setTimeout(() => {
                checkPairs();
                setDisabled(false);
            }, ROUND_TIME);

            return;
        }

        if (currentPlayer === COMPUTER_NAME) {
            handleComputerTurn();
        }
    }, [openPairs]);

    const onModalClose = () => {
        setShowEndGame(false);
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

    return (
        <> 
            <EndGame
                isOpen={showEndGame}
                name={userName}
                onModalClose={onModalClose}
                restartGame={onGameRestart}
                gameHistory={gameHistory}
                isMultiplayer={isMultiplayer}
            />
            <div className={styles.root}>
                {!isMultiplayer ? (
                    <h2 className={styles.root__title}>Hello {userName}! Moves: {moves}</h2>
                ) : (
                    <h2 className={styles.root__title}>{currentPlayer}'s turn!</h2>
                )}
                
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