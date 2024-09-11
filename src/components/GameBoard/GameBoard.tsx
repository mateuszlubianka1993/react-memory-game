import { FC, useState, useEffect, useCallback } from "react";
import { GameCard } from "../../components";
import { createDeck } from "../../helpers/createDeck";
import { DeckItem, GameBoardProps, GameCardMode } from '../../types';
import { ROUND_TIME, BLOCK_TIME } from "../../config/game";
import styles from "./gameBoard.module.scss";

const GameBoard: FC<GameBoardProps> = ({userName}) => {
    const [openPairs, setOpenPairs] = useState<string[]>([]);
    const [foundPairs, setFoundPairs] = useState<string[]>([]);
    const [cards, setCards] = useState<DeckItem[]>([]);
    const [disabled, setDisabled] = useState(false);
    const endGame = foundPairs.length === cards.length / 2;
    const handleCardClick = useCallback((id: string) => {
        setOpenPairs(prevState => [...prevState, id]);
    }, []);
    const isCardOpen = (id: string) => {
        const found = openPairs.find(openId => openId === id) || foundPairs.find(foundId =>  id.includes(foundId));

        return !!found;
    };

    const checkPairs = () => {
        if (openPairs.length === 2) {
            const [first, second] = openPairs;
            const firstPairId = first.split('-')[0];
            const secondPairId = second.split('-')[0];

            if (firstPairId === secondPairId) {
                setFoundPairs(precState => [...precState, firstPairId]);
                setTimeout(() => {
                    setOpenPairs([]);
                    setDisabled(false);
                }, BLOCK_TIME);
            } else {
                setTimeout(() => {
                    setOpenPairs([]);
                    setDisabled(false);
                }, ROUND_TIME);
            }
        }
    };
    
    useEffect(() => {
        const cards = createDeck(GameCardMode.FLAGS);

        setCards(cards);
    }, []);

    useEffect(() => {
        if (openPairs.length === 2) {
            setDisabled(true);
        }
        checkPairs();
    }, [openPairs]);

    if (endGame) {
        return (
            <div className={styles.root}>
                <h2 className={styles.root__title}>Congratulations {userName}!</h2>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <h2 className={styles.root__title}>Hello {userName}!</h2>
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
    );
};

export default GameBoard;