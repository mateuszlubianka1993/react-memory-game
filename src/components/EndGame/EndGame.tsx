import { FC, useRef, useEffect } from "react";
import { Modal, Button } from "../../components";
import { ModalProps, EndGameProps } from '../../types';
import styles from "./endGame.module.scss";

const EndGame: FC<EndGameProps> = ({
    isOpen,
    name,
    isMultiplayer,
    gameHistory,
    restartGame,
    onModalClose,
}) => {
    const modalRef = useRef<ModalProps>();
    const moves = !isMultiplayer && gameHistory.length;
    const yourPairs = gameHistory.filter(item => (item.user === name) && item.foundPair).length;
    const oponentPairs = gameHistory.filter(item => (item.user !== name) && item.foundPair).length;
    let title = `Congratulations ${name}!`;

    const openModal = () => {
        if (!modalRef?.current?.openModal) return;

        modalRef?.current?.openModal();
    };
    const closeModal = () => {
        if (!modalRef?.current?.closeModal) return;

        modalRef?.current?.closeModal();
    };
    const handleRestartGame = () => {
        restartGame();
        closeModal();
    };

    useEffect(() => {
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

    if (isMultiplayer) {
        title = yourPairs > oponentPairs ? `You won ${name}!` : `You lost! ${name}`;
    }

    return (
        <Modal ref={modalRef} onModalClose={onModalClose}>
            <div className={styles.root}>
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
                <div className={styles.root__actions}>
                    <Button onClick={handleRestartGame} fluid>Restart Game</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EndGame;