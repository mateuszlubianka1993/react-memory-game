export interface GameCreatorProps {
    onGameCreated: (userName: string) => void;
}

export interface GameBoardProps {
    userName: string;
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

export interface EndGameProps {
    score?: number;
    name: string;
    isOpen: boolean;
    onModalClose?: () => void;
    restartGame: () => void;
}
