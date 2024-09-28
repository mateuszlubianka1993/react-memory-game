import { useState, useCallback, useEffect } from "react";
import { useAnimate } from "framer-motion";
import { createDeck } from "../../helpers/createDeck";
import { GameConfig, DeckItem, GameHistoryItem } from "../../types/game.types";
import { ROUND_TIME, COMPUTER_NAME } from "../../config/game";

const useGameBoard = ({gameConfig}: {gameConfig: GameConfig}) => {
    const { userName, multiplayer: isMultiplayer, mode: deckType } = gameConfig;
    const [cards, setCards] = useState<DeckItem[]>(createDeck(deckType));
    const [openPairs, setOpenPairs] = useState<string[]>([]);
    const [foundPairs, setFoundPairs] = useState<string[]>([]);
    const [disabled, setDisabled] = useState(false);
    const players = isMultiplayer ? [userName, COMPUTER_NAME] : [userName];
    const [currentPlayer, setCurrentPlayer] = useState(players[0]);
    const [showEndGame, setShowEndGame] = useState(false);
    const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
    const endGame = foundPairs.length > 0 && foundPairs.length === cards.length / 2;
    const moves = !isMultiplayer && gameHistory.length;
    const [scope, animate] = useAnimate();

    const handleCardClick = useCallback((id: string | undefined) => {
        if (!id || disabled) return;

        if (openPairs.length === 1) {
            setOpenPairs((prev) => [...prev, id]);
        } else {
            setOpenPairs([id]);
        }
    }, [openPairs]);

    const isCardOpen = (card: DeckItem) => {
        const { id } = card;

        if (!id) return false;
    
        const found = openPairs.find(openId => openId === id) || foundPairs.find(foundId =>  id.includes(foundId));

        return !!found;
    };

    const checkPairs = () => {
        const [first, second] = openPairs;
        const firstPairId = first.split('-')[0];
        const secondPairId = second.split('-')[0];
        const isPair = firstPairId === secondPairId;

        setGameHistory(prevState => [...prevState, { user: currentPlayer, foundPair: isPair }]);

        const animateCards = (animationProps: any, animationOptions: any) => {
            animate(`.card-${first}, .card-${second}`, animationProps, animationOptions);
        };

        if (isPair) {
            animateCards(
                {
                    scale: [0.5, 1],
                    boxShadow: ['-2px 10px 39px 21px rgba(42, 234, 15, 1)', 'none'],
                },
                {
                    duration: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001
                    },
                    boxShadow: {
                        duration: 0.8
                    }
                }
            );
            setFoundPairs(prevState => [...prevState, firstPairId]);
            setOpenPairs([]);
        } else {
            animateCards(
                {
                    rotateZ: [-20, 0, 20, 0, -20, 0, 20, 0],
                    boxShadow: ['-2px 10px 39px 21px rgba(247, 20, 20, 1)', 'none'],
                },
                {
                    boxShadow: {
                        duration: 0.5,
                    },
                    rotateZ: {
                        duration: 0.3,
                    }
                }
            );

            setTimeout(() => {
                setOpenPairs([]);
                setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0]);
            }, 400);
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

    const onModalClose = () => {
        setShowEndGame(false);
    };

    const onGameRestart = () => {
        setOpenPairs([]);
        setFoundPairs([]);
        setShowEndGame(false);
        setDisabled(false);
        setGameHistory([]);
        const newCards = createDeck(deckType);

        setCards(newCards);
    };

    useEffect(() => {
        if (endGame) {
            setShowEndGame(true);
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
    
    return {
        userName,
        isMultiplayer,
        deckType,
        cards,
        disabled,
        currentPlayer,
        showEndGame,
        gameHistory,
        moves,
        scope,
        handleCardClick,
        isCardOpen,
        onModalClose,
        onGameRestart,
    };
};

export default useGameBoard;
