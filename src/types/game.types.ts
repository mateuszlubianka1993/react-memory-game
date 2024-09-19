export interface GameConfig {
    userName: string;
    multiplayer: boolean;
}

export interface GameCreatorProps {
    onGameCreated: (gameConfig: GameConfig) => void;
}

export interface GameBoardProps {
    gameConfig: GameConfig;
}

export enum GameCardMode {
    FLAGS = "FLAGS",
}

export interface DeckItem {
    pairId: string;
    img: string;
    name: string;
    id: string;
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
}
