import { render, screen, fireEvent } from "@testing-library/react";
import GamePage from "../index";
import { GAME_CARD_MODES } from "../../../config/game";

jest.mock('../../../components', () => ({
    GameCreator: jest.fn(({ onGameCreated }) => (
        <button onClick={() => onGameCreated({ userName: 'testUser', multiplayer: false, mode: GAME_CARD_MODES.FLAGS })}>
            Start Game
        </button>
    )),
    GameBoard: jest.fn(({ gameConfig }) => <div>Game Board for {gameConfig.userName}</div>),
}));

describe('GamePage', () => {
    it('renders GameCreator initially', () => {
        render(<GamePage />);
        expect(screen.getByText('Start Game')).toBeInTheDocument();
    });

    it('renders GameBoard after game is created', () => {
        render(<GamePage />);
        fireEvent.click(screen.getByText('Start Game'));
        expect(screen.getByText('Game Board for testUser')).toBeInTheDocument();
    });
});
