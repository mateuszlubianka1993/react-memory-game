import { FC } from "react";
import { motion } from "framer-motion";
import { GameCard, EndGame } from "../../components";
import useGameBoard from "./useGameBoard";
import { GameBoardProps } from '../../types';
import styles from "./gameBoard.module.scss";

const GameBoard: FC<GameBoardProps> = ({ gameConfig }) => {
    const {
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
    } = useGameBoard({gameConfig});

    return (
        <> 
            {showEndGame ? (
                <EndGame
                    isOpen={showEndGame}
                    name={userName}
                    onModalClose={onModalClose}
                    restartGame={onGameRestart}
                    gameHistory={gameHistory}
                    isMultiplayer={isMultiplayer}
                    deckType={deckType}
                />
            ) : null}
            <div className={styles.root}>
                {!isMultiplayer ? (
                    <h2 className={styles.root__title}>Hello {userName}! Moves: {moves}</h2>
                ) : (
                    <h2 className={styles.root__title}>{currentPlayer}'s turn!</h2>
                )}
                
                <motion.div
                    className={styles.root__boardContainer}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 },},
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    ref={scope}
                >
                    {cards.map((card) => (
                        <GameCard
                            key={card.id}
                            card={card}
                            onClick={handleCardClick}
                            blockClickOpen={true}
                            disabled={disabled}
                            isOpen={isCardOpen(card)}
                            mode={deckType}
                        />
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default GameBoard;