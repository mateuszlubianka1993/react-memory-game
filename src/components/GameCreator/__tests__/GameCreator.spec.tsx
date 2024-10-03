import { render, screen, fireEvent } from "@testing-library/react";
import GameCreator from "../GameCreator";
import { GAME_CARD_MODES } from "../../../config/game";

describe('GameCreator', () => {
    const mockOnGameCreated = jest.fn();

    beforeEach(() => {
        mockOnGameCreated.mockClear();
    });

    test('renders GameCreator component', () => {
        render(<GameCreator onGameCreated={mockOnGameCreated} />);
        expect(screen.getByText('Create a New Game')).toBeInTheDocument();
    });

    test('validates user input', () => {
        render(<GameCreator onGameCreated={mockOnGameCreated} />);
        const input = screen.getByPlaceholderText('Enter a name...');
        fireEvent.change(input, { target: { value: 'Jo' } });
        fireEvent.blur(input);
        expect(screen.getByText('Start Game')).toBeDisabled();
        fireEvent.change(input, { target: { value: 'John' } });
        expect(screen.getByText('Start Game')).not.toBeDisabled();
    });

    test('calls onGameCreated with correct data', () => {
        render(<GameCreator onGameCreated={mockOnGameCreated} />);
        const input = screen.getByPlaceholderText('Enter a name...');
        fireEvent.change(input, { target: { value: 'John' } });
        const button = screen.getByText('Start Game');
        fireEvent.click(button);
        expect(mockOnGameCreated).toHaveBeenCalledWith({
            userName: 'John',
            multiplayer: false,
            mode: GAME_CARD_MODES.FLAGS,
        });
    });

    test('toggles multiplayer mode', () => {
        render(<GameCreator onGameCreated={mockOnGameCreated} />);
        const multiplayerToggle = screen.getByRole('checkbox');
        fireEvent.click(multiplayerToggle);
        const button = screen.getByText('Start Game');
        fireEvent.change(screen.getByPlaceholderText('Enter a name...'), { target: { value: 'John' } });
        fireEvent.click(button);
        expect(mockOnGameCreated).toHaveBeenCalledWith({
            userName: 'John',
            multiplayer: true,
            mode: GAME_CARD_MODES.FLAGS,
        });
    });
});