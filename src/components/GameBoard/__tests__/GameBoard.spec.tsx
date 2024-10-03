import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "../GameBoard";
import { GameBoardProps } from "../../../types";
import useGameBoard from "../useGameBoard";
import { GAME_CARD_MODES } from "../../../config/game";

jest.mock('../useGameBoard');

const mockUseGameBoard = useGameBoard as jest.MockedFunction<typeof useGameBoard>;

const mockGameConfig = {
    userName: 'User',
    multiplayer: false,
    mode: GAME_CARD_MODES.FLAGS,
};

const mockProps: GameBoardProps = {
    gameConfig: mockGameConfig,
};

describe('GameBoard', () => {
    beforeEach(() => {
        mockUseGameBoard.mockReturnValue({
            userName: 'Player1',
            isMultiplayer: false,
            deckType: 'standard',
            cards: [
                { id: '1', pairId: 'A', name: '', img: 'test-img' },
                { id: '2', pairId: 'B', name: '', img: 'test-img' },
            ],
            disabled: false,
            currentPlayer: 'Player1',
            showEndGame: false,
            gameHistory: [],
            moves: 0,
            scope: { current: null, animations: [] },
            handleCardClick: jest.fn(),
            isCardOpen: jest.fn().mockReturnValue(false),
            onModalClose: jest.fn(),
            onGameRestart: jest.fn(),
        });
    });

    it('renders the GameBoard component', () => {
        render(<GameBoard {...mockProps} />);
        expect(screen.getByText('Hello Player1! Moves: 0')).toBeInTheDocument();
    });

    it('renders the correct number of GameCard components', () => {
        render(<GameBoard {...mockProps} />);
        expect(screen.getAllByRole('card').length).toBe(2);
    });

    it('calls handleCardClick when a card is clicked', () => {
        render(<GameBoard {...mockProps} />);
        const card = screen.getAllByRole('card')[0];
        fireEvent.click(card);
        expect(mockUseGameBoard(mockProps).handleCardClick).toHaveBeenCalled();
    });

    it('displays the correct player turn in multiplayer mode', () => {
        mockUseGameBoard.mockReturnValueOnce({
            ...mockUseGameBoard(mockProps),
            isMultiplayer: true,
            currentPlayer: 'Player2',
        });
        render(<GameBoard {...mockProps} />);
        expect(screen.getByText("Player2's turn!")).toBeInTheDocument();
    });
});