import { FC, memo, useState, useEffect } from "react";
import { getRandomCardByMode } from "../../../../helpers/createDeck";
import { ModeItemProps, DeckItem } from '../../../../types';
import styles from "./modeItem.module.scss";



const ModeItem: FC<ModeItemProps> = memo(({ modeName, active, onClick }) => {
    const [card, setCard] = useState<DeckItem | null>(null);

    useEffect(() => {
        const card = getRandomCardByMode(modeName);
        setCard(card);
    }, []);

    const handleModeChange = () => {
        if (active) return;

        onClick(modeName);
    };

    if (!card) return null;

    return (
        <div
            className={`${styles.modeItem} ${active ? styles.active : undefined}`}
            onClick={handleModeChange}
        >
            <img src={card.img} alt={card.name} className={styles.modeItem__image} />
            <h3 className={styles.modeItem__title}>{modeName}</h3>
        </div>
    );
});

export default ModeItem;