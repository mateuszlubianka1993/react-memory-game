import { GAME_CARD_MODES } from "../config/game";

const { FLAGS, LOGOS } = GAME_CARD_MODES;
type FLAGS = string;
type LOGOS = string;

export interface GameConfig {
    userName: string;
    multiplayer: boolean;
    mode: GameCardMode;
}

export interface GameCreatorProps {
    onGameCreated: (gameConfig: GameConfig) => void;
}

export interface GameBoardProps {
    gameConfig: GameConfig;
}

export type GameCardMode = FLAGS | LOGOS;

export interface DeckItem {
    pairId: string;
    img: string;
    name: string;
    id?: string;
}

export interface GameCardProps {
    card: DeckItem;
    onClick: (id: string) => void;
    mode?: GameCardMode;
    isOpen: boolean;
    blockClickOpen?: boolean;
    disabled?: boolean;
}

export interface GameHistoryItem {
    user: string;
    foundPair: boolean;
}

export interface EndGameProps {
    name: string;
    isOpen: boolean;
    onModalClose?: () => void;
    restartGame: () => void;
    gameHistory: GameHistoryItem[];
    isMultiplayer: boolean;
    deckType: GameCardMode;
}

export interface ModeItemProps {
    modeName: GameCardMode;
    active: boolean;
    onClick: (mode: GameCardMode) => void;
}
