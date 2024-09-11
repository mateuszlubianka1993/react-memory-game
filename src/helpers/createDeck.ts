import { CARD_DECKS } from "../config/cards";
import { DeckItem } from "../types";

export function createDeck(deckMode: string): DeckItem[] {
    const foundArray = CARD_DECKS[deckMode as keyof typeof CARD_DECKS];
    const newArray = foundArray.flatMap(item => [{...item, id: `${item.pairId}-1`}, {...item, id: `${item.pairId}-2`}]);
    const randomArray = newArray.sort(() => Math.random() - 0.5);
    return randomArray;
}
