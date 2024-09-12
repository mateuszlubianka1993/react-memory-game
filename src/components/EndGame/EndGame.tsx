import { FC, useRef, useEffect, memo } from "react";
import { Modal, Button } from "../../components";
import { ModalProps, EndGameProps } from '../../types';
import styles from "./endGame.module.scss";

const EndGame: FC<EndGameProps> = memo(({ isOpen, score, name, restartGame, onModalClose }) => {
    const modalRef = useRef<ModalProps>();
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

    return (
        <Modal ref={modalRef} onModalClose={onModalClose}>
            <div className={styles.root}>
                <h2 className={styles.root__title}>Congratulations {name}!</h2>
                <p className={styles.root__text}>You found all the pairs.</p>
                <p className={styles.root__text}>You score: {score}</p>
                <div className={styles.root__actions}>
                    <Button onClick={handleRestartGame} fluid>Restart Game</Button>
                </div>
            </div>
        </Modal>
    );
});

export default EndGame;