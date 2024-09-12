import { FC, useState, useEffect } from "react";
import { GiBlackFlag } from "react-icons/gi";
import { GameCardProps, GameCardMode } from "../../types";
import styles from "./gameCard.module.scss";

function getLabel(mode: GameCardMode): string {
    switch (mode) {
        case GameCardMode.FLAGS:
            return 'Flags';
        default:
            return '';
    }
}

const GameCard: FC<GameCardProps> = ({
    card,
    mode = GameCardMode.FLAGS,
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

    const handleClick = (id: string) => {
        if (disabled) return;

        onClick(id);

        if (blockClickOpen) return;
        setIsFlipped(true);
    };

    return (
        <div
            className={styles.root}
            onClick={() => handleClick(card.id)}
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
        </div>
    );
};

export default GameCard;