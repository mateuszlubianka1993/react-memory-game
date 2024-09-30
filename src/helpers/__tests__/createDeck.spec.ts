import { createDeck, getRandomCardByMode } from "../createDeck";
import { CARD_DECKS } from "../../config/cards";
import { GameCardMode } from "../../types";
import { GAME_CARD_MODES } from "../../config/game";

type Card = {
    pairId: string;
    img: string;
    name: string;
};

type CardDecks = {
    FLAGS: Card[];
    LOGOS: Card[];
};

describe('createDeck', () => {
    it('should create a deck with pairs of cards for the given mode', () => {
        const deckMode: GameCardMode = GAME_CARD_MODES.FLAGS;
        const deck = createDeck(deckMode);

        expect(deck.length).toBe(CARD_DECKS[deckMode as keyof CardDecks].length * 2);
        const pairIds = deck.map(card => card.pairId);
        const uniquePairIds = new Set(pairIds);
        expect(uniquePairIds.size).toBe(CARD_DECKS[deckMode as keyof CardDecks].length);
    });

    it('should shuffle the deck', () => {
        const deckMode: GameCardMode = GAME_CARD_MODES.FLAGS;
        const deck = createDeck(deckMode);
        const deckCopy = deck.flatMap(item => [{...item, id: `${item.pairId}-1`}, {...item, id: `${item.pairId}-2`}]);

        expect(deck).not.toEqual(deckCopy.sort((a, b) => a.id.localeCompare(b.id)));
    });
});

describe('getRandomCardByMode', () => {
    it('should return a random card from the specified deck mode', () => {
        const deckMode: GameCardMode = GAME_CARD_MODES.FLAGS;
        const card = getRandomCardByMode(deckMode);

        expect(CARD_DECKS[deckMode as keyof CardDecks]).toContainEqual(card);
    });

    it('should return undefined if the deck mode does not exist', () => {
        const deckMode = 'nonexistent' as GameCardMode;
        const card = getRandomCardByMode(deckMode);

        expect(card).toBeUndefined();
    });
});
