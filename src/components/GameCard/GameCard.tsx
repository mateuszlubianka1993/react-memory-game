import { FC, useState, useEffect } from "react";
import { GiBlackFlag } from "react-icons/gi";
import { motion } from "framer-motion";
import { GameCardProps, GameCardMode } from "../../types";
import { GAME_CARD_MODES } from "../../config/game";
import styles from "./gameCard.module.scss";

function getLabel(mode: GameCardMode): string {
    switch (mode) {
        case GAME_CARD_MODES.FLAGS:
            return 'Flags';
        case GAME_CARD_MODES.LOGOS:
                return 'Logos';
        default:
            return '';
    }
}

const GameCard: FC<GameCardProps> = ({
    card,
    mode = GAME_CARD_MODES.FLAGS,
    isOpen = false,
    blockClickOpen = false,
    disabled = false,
    onClick,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        setIsFlipped(isOpen);
    }, [isOpen]);

    let icon = <GiBlackFlag />;
    const label = getLabel(mode);

    const handleClick = (id: string | undefined) => {
        if (disabled || isOpen || !id) return;

        onClick(id);

        if (blockClickOpen) return;
        setIsFlipped(true);
    };

    return (
        <motion.div
            className={`${styles.root} ${isFlipped ? 'flipped' : ''} card-${card.id}`}
            onClick={() => handleClick(card.id)}
            variants={{
                visible: { opacity: 1, rotateZ: 0 },
                hidden: { opacity: 0, rotateZ: 180 }
            }}
            transition={{ duration: 1.5, type: 'spring', stiffness: 80 }}
            role="card"
        > 
            <div className={`${styles.root__inner} ${isFlipped ? styles.root__inner__flipped : ''}`}>
                <div className={styles.root__front}>
                    <div className={styles.root__logo}>
                        {icon}
                    </div>
                    <p className={styles.root__title}>Memory</p>
                    <p className={styles.root__label}>{label}</p>
                </div>
                <div className={styles.root__back}>
                    <div className={styles.root__back__overlay}>
                        <p className={styles.root__back__overlay__title}>{card.name}</p>
                    </div>
                    <div className={styles.root__back__imgBox}>
                        <img className={styles.root__back__img} src={card.img} alt={card.name} />
                    </div>
                    <p className={styles.root__back__title}>{card.name}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default GameCard;